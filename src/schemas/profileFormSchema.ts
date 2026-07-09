import { z } from "zod";

export const profileFormSchema = z
  .object({
    lastName: z.string().min(1, "Обязательное поле"),
    firstName: z.string().min(1, "Обязательное поле"),
    middleName: z.string().optional(),
    email: z.string().min(1, "Обязательное поле").email("Некорректный email"),
    idNumber: z
      .string()
      .min(1, "Обязательное поле")
      .regex(/^\d{12}$/, "Должен содержать ровно 12 цифр"),
    password: z
      .string()
      .min(8, "Минимум 8 символов, буквы и цифры")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, "Минимум 8 символов, буквы и цифры"),
    confirmPassword: z.string().min(1, "Обязательное поле"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
