import { z } from "zod";

export const registerSchema = z.object({
  first_name: z.string().min(2, "Must be  at least 2 characters!"),
  last_name: z.string().min(2, "Must be at least 2 characters").optional(),
  email: z.email("Invalid Email Format!"),
  organization_name: z.string().optional(),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(/[A-Z]/, "Password at least 1 uppercase character ")
    .regex(/[a-z]/, "Password at least 1 lowercase characters")
    .regex(/[0-9]/, "Password containt at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password containt at least 1 special character"),
  referrer_code: z.string().optional(),
  country: z.string(),
  birth_date: z.date(),
  phone_number: z.int(),
  avatar: z.string("Must be a valid URL!").optional(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
