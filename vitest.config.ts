import { aliasTs } from '@bemedev/vitest-alias';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [aliasTs(tsconfig)],

  test: {
    environment: 'node',
    globals: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      all: true,
      exclude: ['**/types.ts', '**/index.ts'],
      provider: 'v8',
    },
  },
});
