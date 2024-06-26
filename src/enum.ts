import { z } from 'zod';
import type { MappedZodLiterals } from './types';

function createManyUnion<
  A extends Readonly<[z.Primitive, z.Primitive, ...z.Primitive[]]>,
>(literals: A) {
  return z.union(
    literals.map(value => z.literal(value)) as MappedZodLiterals<A>,
  );
}

export function createEnum<T extends readonly [z.Primitive]>(
  ...values: T
): z.ZodLiteral<T[0]>;

export function createEnum<
  T extends readonly [z.Primitive, z.Primitive, ...z.Primitive[]],
>(...values: T): z.ZodUnion<MappedZodLiterals<T>>;

export function createEnum<T extends readonly []>(
  ...values: T
): z.ZodNever;

export function createEnum<T extends readonly z.Primitive[]>(
  ...values: T
) {
  if (values.length > 1) {
    return createManyUnion(
      values as typeof values &
        [z.Primitive, z.Primitive, ...z.Primitive[]],
    );
  } else if (values.length === 1) {
    return z.literal(values[0]);
  } else {
    return z.never();
  }
}

// const d = createEnum();
