import { z } from 'zod';

export const ttest1 = z.object({});

export const ttest2 = z.object({
  age: z.number(),
  login: z.string(),
});

export const ttest3 = z.object({
  data: z.object({
    age: z.number(),
    login: z.string(),
  }),
  _id: z.string(),
});

export const ttest4 = z.object({
  stats: z.string().array(),
  data: z.object({
    age: z.number(),
    login: z.string().optional(),
    sub: z.object({
      strs: z.string().array(),
      helpers: z
        .object({
          age: z.number(),
          login: z.string(),
        })
        .array(),
    }),
  }),
  otherNumb: z.number(),
  _id: z.string(),
});
