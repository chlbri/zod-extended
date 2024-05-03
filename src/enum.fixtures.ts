import { TestArgs } from '@bemedev/vitest-extended/lib/types';
import { z } from 'zod';
import { createEnum } from './enum';
import {
  COLORS_HEX,
  COLOR_NUMBERS,
  COLOR_STRINGS,
  CSS_COLORS,
  DIGITS,
  TRANSPARENCY_DIGITS,
} from './enum.data.fixtures';

export const tDIgits = createEnum(DIGITS);
export const tTransparency = createEnum(TRANSPARENCY_DIGITS);
export const tNumbers = createEnum(COLOR_NUMBERS);
export const tStrings = createEnum(COLOR_STRINGS);
export const tCSS = createEnum(CSS_COLORS);
export const tColorsHex = createEnum(COLORS_HEX);

export const createBoolean = <T extends z.ZodTypeAny>(zod: T) => {
  return (arg: any) => zod.safeParse(arg).success;
};

export const toTestArgs = <T>(...datas: [any, T][]) => {
  const out = datas.map(([value, expected]) => [
    `${value} => ${expected}`,
    [value],
    expected,
  ]) as TestArgs<(arg: any) => T>;
  return out;
};
