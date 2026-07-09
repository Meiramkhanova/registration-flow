import { z } from "zod";

export const profileFormSchema = z
  .object({
    lastName: z.string().min(1, "step3.errors.required"),
    firstName: z.string().min(1, "step3.errors.required"),
    middleName: z.string().optional(),
    email: z
      .string()
      .min(1, "step3.errors.required")
      .email("step3.errors.invalidEmail"),
    idNumber: z
      .string()
      .min(1, "step3.errors.required")
      .regex(/^\d{12}$/, "step3.errors.invalidIdNumber"),
    password: z
      .string()
      .min(8, "step3.errors.weakPassword")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "step3.errors.weakPassword"),
    confirmPassword: z.string().min(1, "step3.errors.required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "step3.errors.passwordMismatch",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
