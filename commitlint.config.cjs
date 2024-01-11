const { rules } = require('@commitlint/config-conventional');

const isCi = process.env.CI === 'true';

/** @type {import('@commitlint/types').UserConfig} **/
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [...rules['type-enum'][2], 'api', 'release']],
    'scope-enum': [2, 'always', ['connector', 'console', 'core', 'demo-app', 'test', 'phrases', 'schemas', 'shared', 'experience', 'deps', 'deps-dev', 'cli', 'toolkit', 'cloud', 'app-insights']],
    // Slightly increase the tolerance to allow the appending PR number
    ...(isCi && { 'header-max-length': [2, 'always', 110] }),
    'body-max-line-length': [2, 'always', 110],
  },
};
