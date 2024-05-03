import { createTests as _createTests } from '@bemedev/vitest-extended';
import { describe } from 'vitest';
import { z } from 'zod';
import {
  createBoolean,
  tCSS,
  tColorsHex,
  tDIgits,
  tNumbers,
  tStrings,
  tTransparency,
  toTestArgs,
} from './enum.fixtures';

const createTests = <T extends z.ZodType<z.Primitive>>(zod: T) => {
  const fn = createBoolean(zod);
  const useTests = _createTests(fn);

  return (...datas: [any, boolean][]) => {
    const testArgs = toTestArgs(...datas);
    return useTests(...testArgs);
  };
};

describe('tDigits', () => {
  const useTests = createTests(tDIgits);

  useTests([1, true], [5, true], [10, false]);
});

describe('tTransparency', () => {
  const useTests = createTests(tTransparency);

  useTests([1, true], [5, true], [10, true], [100, true], [101, false]);
});

describe('tNumbers', () => {
  const useTests = createTests(tNumbers);

  useTests([1, true], [100, true], [200, true], [256, false]);
});

describe('tStrings', () => {
  const useTests = createTests(tStrings);

  useTests([1, false], [100, false], ['a', true], ['f', true]);
});

describe('tCSS', () => {
  const useTests = createTests(tCSS);

  useTests(
    [1, false],
    [100, false],
    ['aliceblue', true],
    ['bisque', true],
  );
});

describe('tColorsHex', () => {
  const useTests = createTests(tColorsHex);

  useTests(
    [1, true],
    [10, false],
    [100, false],
    ['a', true],
    ['c', true],
    ['d', true],
    ['g', false],
  );
});
