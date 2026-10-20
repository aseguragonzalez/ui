import { resolve as resolvePath } from 'node:path';
import { contrast, ruleCases, stylesheet } from '../../test/contrast';

const rule = stylesheet(resolvePath(import.meta.dirname, 'Badge.module.css'));

describe('Badge brand and accent label contrast', () => {
  it.each(ruleCases(rule, ['.brand', '.accent']))('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
