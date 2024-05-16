import { z } from 'zod';
import type { KeysMatchingWithArray } from './types';

/**
 * From {@link https://github.com/colinhacks/zod/discussions/2134#discussioncomment-5194111 navtoj}.
 * Get zod object keys recursively
 * @param schema The schema to return keys
 * @returns A string array of all keys of schema
 */
export const _zodKeys = <T extends z.ZodTypeAny>(schema: T): string[] => {
  // check if schema is nullable or optional
  if (schema instanceof z.ZodNullable || schema instanceof z.ZodOptional)
    return _zodKeys(schema.unwrap());
  // check if schema is an array
  if (schema instanceof z.ZodArray) return _zodKeys(schema.element);
  // check if schema is an object
  if (schema instanceof z.ZodObject) {
    // get key/value pairs from schema
    const entries = Object.entries(schema.shape);
    // loop through key/value pairs
    return entries.flatMap(([key, value]) => {
      // get nested keys
      const nested = _zodKeys(value as any).map(
        subKey => `${key}.${subKey}`,
      );

      // return nested keys
      return nested.length ? nested : key;
    });
  }
  // return empty array
  return [];
};

export const zodObjectKeys = <T extends z.AnyZodObject>(schema: T) => {
  const out = _zodKeys(schema);
  type Inferred = z.infer<T>;

  return out as KeysMatchingWithArray<Inferred>[];
};
