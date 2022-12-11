module.exports = {
    stories: ["../packages/**/*.stories.tsx"],
    addons: ["storybook-css-modules-preset"],
    framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-vite",
    },
    reactOptions: {
        fastRefresh: true,
    },
    features: {
        storyStoreV7: true,
    },
};
