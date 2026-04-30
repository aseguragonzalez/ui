import type { Preview } from '@storybook/react-vite';
import '../src/tokens/tokens.css';
import './preview.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      if (!context.parameters['skipThemeDecorator']) {
        const theme = (context.globals['theme'] ?? 'light') as 'light' | 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
      } else {
        document.documentElement.removeAttribute('data-theme');
        document.body.removeAttribute('data-theme');
      }
      return Story();
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
  },
};

export default preview;
