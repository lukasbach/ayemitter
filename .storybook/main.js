module.exports = {
  stories: ['../packages/**/*.stories.@(js|jsx|mdx|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-actions', '@storybook/addon-links'],
  typescript: {
    check: true,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
        module: 'CommonJS',
      },
    },
  },
};
