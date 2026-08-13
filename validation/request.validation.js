import { z } from 'zod';

export const signupPostRequestBodySchema = z.object({
    firstname: z.string().min(2).max(100),
    lastname: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(100)
});