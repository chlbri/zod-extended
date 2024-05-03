import { createTests as _createTests } from '@bemedev/vitest-extended';
import { describe } from 'vitest';
import { z } from 'zod';
import { createEnum } from './enum';
import { toTestArgs } from './enum.fixtures';

const createFn = <T extends z.Primitive[]>(...args: T) => {
  const zod = createEnum(...(args as any));
  return (arg: string) => zod._def.typeName === arg;
};

const createTests = <T extends z.Primitive[]>(...args: T) => {
  const fn = createFn(...args);
  const useTests = _createTests(fn);
  return (...datas: [string, boolean][]) => {
    const testArgs = toTestArgs(...datas);
    return useTests(...testArgs);
  };
};

describe('#1 => Zero arg', () => {
  const useTests = createTests();
  useTests(['ZodNever', true], ['Any', false], ['ZodString', false]);
});

describe('#2 => One arg', () => {
  describe('#1 => string', () => {
    const useTests = createTests('Right Test');
    useTests(
      ['ZodString', false],
      ['Any', false],
      ['ZodAny', false],
      ['Right Test', false],
      ['ZodLiteral', true],
    );
  });
});
