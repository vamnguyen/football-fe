import { z } from "zod";
import { FOOTBALL_TEAMS } from "@/lib/enum";

export const signInSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(100, "Mật khẩu không được vượt quá 100 ký tự"),
});
export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Vui lòng nhập tên"),
    lastName: z.string().min(1, "Vui lòng nhập họ"),
    email: z.string().email("Email không hợp lệ"),
    password: z
      .string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .max(100, "Mật khẩu không được vượt quá 100 ký tự"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản và chính sách bảo mật",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });
export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, "Vui lòng nhập tên"),
  lastName: z.string().min(1, "Vui lòng nhập họ"),
  favoriteTeam: z
    .nativeEnum(FOOTBALL_TEAMS, {
      message: "Vui lòng chọn đội yêu thích",
    })
    .nullable(),
});
export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Mật khẩu hiện tại phải có ít nhất 6 ký tự"),
  newPassword: z.string().min(6, "Mật khẩu mới phải có ít nhất 6 ký tự"),
});
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export const matchesFilterSchema = z
  .object({
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    season: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.dateFrom && !data.dateTo) {
        return false;
      }
      if (!data.dateFrom && data.dateTo) {
        return false;
      }
      if (data.dateFrom && data.dateTo) {
        return new Date(data.dateFrom) <= new Date(data.dateTo);
      }
      return true;
    },
    {
      message:
        "Date From and Date To must be used together, and Date From must be before or equal to Date To",
      path: ["dateTo"],
    }
  );

export type MatchesFilterSchemaType = z.infer<typeof matchesFilterSchema>;
