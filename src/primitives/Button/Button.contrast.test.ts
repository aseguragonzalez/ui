import { resolve as resolvePath } from 'node:path';
import { contrast, resolve, stylesheet, themes, type Declarations } from '../../test/contrast';

const rule = stylesheet(resolvePath(import.meta.dirname, 'Button.module.css'));

const restBackgrounds = ['var(--ds-color-bg-page)', 'var(--ds-color-bg-surface)'];
const enabled = ':not(:disabled)';

const cases = Object.entries(themes()).flatMap(([themeName, theme]) =>
  ['primary', 'secondary', 'ghost'].flatMap((variant) => {
    const rest = rule(`.${variant}`);
    return [
      ['rest', rest],
      ['hover', { ...rest, ...rule(`.${variant}:hover${enabled}`) }],
      ['active', { ...rest, ...rule(`.${variant}:active${enabled}`) }],
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

describe('Button primary, secondary and ghost label contrast', () => {
  it.each(cases)('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});

describe('Button destructive label contrast', () => {
  const destructiveCases = Object.entries(themes()).flatMap(([themeName, theme]) => {
    const rest = rule('.destructive');
    return (['rest', 'hover', 'active'] as const).map((state) => {
      const { color, 'background-color': background } =
        state === 'rest' ? rest : { ...rest, ...rule(`.destructive:${state}${enabled}`) };
      return {
        name: `${themeName} destructive ${state}: ${color} on ${background}`,
        foreground: resolve(theme, color),
        background: resolve(theme, background),
      };
    });
  });

  it.each(destructiveCases)('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
