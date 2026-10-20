import { resolve as resolvePath } from 'node:path';
import { contrast, ruleCases, stylesheet } from '../../test/contrast';

const rule = stylesheet(resolvePath(import.meta.dirname, 'Navbar.module.css'));

describe('Navbar active link contrast', () => {
  it.each(
    ruleCases(rule, [
      '.navLinkActive',
      ['.navLinkActive', '.navLinkActive:hover'],
      '.mobileNavLinkActive',
    ]),
  )('$name reaches 4.5:1', ({ foreground, background }) => {
    expect(contrast(foreground, background)).toBeGreaterThanOrEqual(4.5);
  });
});
