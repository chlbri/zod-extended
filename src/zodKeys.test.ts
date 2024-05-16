import { createTests } from '@bemedev/vitest-extended';
import type { Fc } from '@bemedev/vitest-extended/lib/types';
import { relative } from 'node:path';
import { describe } from 'node:test';
import tsd, { formatter } from 'tsd';
import { expect, test } from 'vitest';
import { z } from 'zod';
import { zodObjectKeys } from './zodKeys';
import { ttest1, ttest2, ttest3, ttest4 } from './zodKeys.fixtures';

test('#0 => Types', async () => {
  const file = relative(process.cwd(), __filename).replace(
    '.test.ts',
    '.test-d.ts',
  );
  const testFiles = [file];
  const _tsd = await tsd({
    cwd: process.cwd(),
    testFiles,
  });
  const _fd = formatter(_tsd, true);
  expect(_fd).toBe('');
});

describe('#1 => Function', () => {
  const useTests = createTests<Fc>(zodObjectKeys);

  useTests(
    ['boolean', [z.boolean()], []],
    ['number', [z.number()], []],
    ['string', [z.string()], []],
    ['array', [z.string().array()], []],
    ['Empty object', [ttest1], []],
    ['Simple object', [ttest2], ['age', 'login']],
    ['Recursive object', [ttest3], ['data.age', 'data.login', '_id']],
    [
      'Very complex object',
      [ttest4],
      [
        'data.age',
        'data.login',
        'stats',
        'otherNumb',
        'data.sub.helpers.age',
        'data.sub.helpers.login',
        'data.sub.strs',
        '_id',
      ],
    ],
  );
});
