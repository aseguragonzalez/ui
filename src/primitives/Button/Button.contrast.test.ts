import { readFileSync } from 'node:fs';
import { resolve as resolvePath } from 'node:path';

const tokensCss = readFileSync(resolvePath(import.meta.dirname, '../../tokens/tokens.css'), 'utf8');
const buttonCss = readFileSync(resolvePath(import.meta.dirname, 'Button.module.css'), 'utf8');

type Declarations = Record<string, string>;

function stripComments(css: string): string {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function parseDeclarations(body: string): Declarations {
  return Object.fromEntries(
    [...body.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map((match) => [match[1], match[2].trim()]),
  );
}

function blockAfter(css: string, start: number): string {
  const open = css.indexOf('{', start);
  let depth = 0;
  for (let index = open; index < css.length; index++) {
    if (css[index] === '{') depth++;
    if (css[index] === '}' && --depth === 0) return css.slice(open + 1, index);
  }
  throw new Error('Unbalanced CSS block');
}

function themes(): Record<string, Declarations> {
  const css = stripComments(tokensCss);
  const light = parseDeclarations(blockAfter(css, css.indexOf(':root {')));
  const mediaStart = css.indexOf('@media (prefers-color-scheme: dark)');
  const media = parseDeclarations(blockAfter(css, css.indexOf(':root:not', mediaStart)));
  const attribute = parseDeclarations(blockAfter(css, css.indexOf('[data-theme="dark"] {')));
  return {
    light,
    'dark (prefers-color-scheme)': { ...light, ...media },
    'dark ([data-theme="dark"])': { ...light, ...attribute },
  };
}

function rule(selector: string): Declarations {
  const css = stripComments(buttonCss);
  const start = css.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`Missing rule ${selector}`);
  return parseDeclarations(blockAfter(css, start));
}

function resolve(theme: Declarations, value: string): string {
  const reference = /^var\((--[\w-]+)\)$/.exec(value);
  return reference ? resolve(theme, theme[reference[1]]) : value;
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

const restBackgrounds = ['var(--ds-color-bg-page)', 'var(--ds-color-bg-surface)'];

const cases = Object.entries(themes()).flatMap(([themeName, theme]) =>
  ['secondary', 'ghost'].flatMap((variant) => {
    const rest = rule(`.${variant}`);
    return [
      ['rest', rest],
      ['hover', { ...rest, ...rule(`.${variant}:hover:not(:disabled)`) }],
      ['active', { ...rest, ...rule(`.${variant}:active:not(:disabled)`) }],
    ].flatMap(([state, declarations]) => {
      const { color, 'background-color': background } = declarations as Declarations;
      const backgrounds = background === 'transparent' ? restBackgrounds : [background];
      return backgrounds.map((bg) => ({
        name: `${themeName} ${variant} ${state as string}: ${color} on ${bg}`,
        foreground: resolve(theme, color),
        background: resolve(theme, bg),
      }));
    });
  }),
);

describe('Button secondary and ghost label contrast', () => {
  it.each(cases)('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
