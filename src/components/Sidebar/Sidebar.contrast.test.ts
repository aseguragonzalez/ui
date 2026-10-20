import { resolve as resolvePath } from 'node:path';
import { contrast, ruleCases, stylesheet } from '../../test/contrast';

const rule = stylesheet(resolvePath(import.meta.dirname, 'Sidebar.module.css'));

describe('Sidebar active link contrast', () => {
  it.each(ruleCases(rule, ['.navLinkActive']))('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
