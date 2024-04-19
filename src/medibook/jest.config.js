module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  babelConfig: require('./medibook/babel.config.js'),
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapper: {
    // Handle module aliases (if you are using them in your project)
    '^@/components/(.*)$': '<rootDir>/components/$1',
  },
  transform: {
    // Handle TypeScript and JavaScript files
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
