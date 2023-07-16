import { z } from "zod";

export const BoardValidator = z.object({
    name: z.string().min(1).max(100)
})
export const ColsValidator = z.array(
    z.object({
        value: z.string().min(1).max(100),
    })
);

export type BoardZod = z.infer<typeof BoardValidator>;
export type ColsZod = z.infer<typeof ColsValidator>;
