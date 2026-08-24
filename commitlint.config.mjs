const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Bodies are often pasted from tooling output or written unwrapped; the
    // header limit is the one that catches real mistakes.
    'body-max-line-length': [0, 'always'],
  },
};

export default config;
