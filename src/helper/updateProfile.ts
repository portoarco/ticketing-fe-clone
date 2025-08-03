import { z } from "zod";

// max file size :
const MAX_FILE_SIZE = 2 * 1024 * 1024; //2 mb file size

export const updateProfileSchema = z.object({
  first_name: z.string().min(1, "Must be  at least 1 character!").optional(),
  last_name: z.string().min(1, "Must be at least 1 character").optional(),
  email: z.email("Invalid Email Format!").optional(),
  organizer_name: z.string().optional(),
  password: z
    .string()
    .min(6, "Must be at least 6 characters")
    .regex(/[A-Z]/, "Password at least 1 uppercase character ")
    .regex(/[a-z]/, "Password at least 1 lowercase characters")
    .regex(/[0-9]/, "Password containt at least 1 number")
    .regex(/[^A-Za-z0-9]/, "Password containt at least 1 special character")
    .optional(),
  phone_number: z.string().optional(),
  // avatar: z.string("Must be a valid URL!").optional().nullable(),
  avatar: z
    .custom<FileList>()
    .optional()
    .refine(
      (files) => {
        if (!files || files.length === 0) return true;
        return files[0] instanceof File && files[0].size <= MAX_FILE_SIZE;
      },
      {
        message: "Avatar image must be under 2 MB",
      }
    ),
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
