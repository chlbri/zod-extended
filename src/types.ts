import type { z } from 'zod';

// #region Tuplify Union
type _UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

type _LastOf<T> =
  _UnionToIntersection<
    T extends any ? () => T : never
  > extends () => infer R
    ? R
    : never;

type _Push<T extends any[], V> = [...T, V];

type _TuplifyUnionBoolean<T> = [T] extends [never] ? true : false;

// TS4.1+
export type TuplifyUnion<T> =
  true extends _TuplifyUnionBoolean<T>
    ? []
    : _Push<TuplifyUnion<Exclude<T, _LastOf<T>>>, _LastOf<T>>;

// #endregion
// #endregion

export type MappedZodLiterals<T extends readonly z.Primitive[]> = {
  -readonly [K in keyof T]: z.ZodLiteral<T[K]>;
};

export type Ru = Record<string, unknown>;

export type KeysMatching<
  T extends Ru,
  AddObjectKeys extends boolean = true,
  Key = keyof T,
> = Key extends string
  ? T[Key] extends Ru
    ?
        | `${Key}.${KeysMatching<T[Key], AddObjectKeys>}`
        | (AddObjectKeys extends true ? Key : never)
    : T[Key] extends Array<Ru>
      ?
          | `${Key}.${KeysMatching<T[Key][number], AddObjectKeys>}`
          | (AddObjectKeys extends true ? Key : never)
      : Key
  : never;
