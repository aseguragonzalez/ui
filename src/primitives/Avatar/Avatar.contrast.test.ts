import { resolve as resolvePath } from 'node:path';
import { contrast, ruleCases, stylesheet } from '../../test/contrast';

const rule = stylesheet(resolvePath(import.meta.dirname, 'Avatar.module.css'));

describe('Avatar initials contrast', () => {
  it.each(ruleCases(rule, ['.avatar']))('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
