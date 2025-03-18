import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/auth";
import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/lib/validation";

export function ChangePasswordForm() {
  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  const { mutate: changePasswordMutation, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      form.reset();
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (error) => {
      toast.error(error.message || "Có lỗi xảy ra khi đổi mật khẩu.");
    },
  });

  function onSubmit(data: ChangePasswordSchemaType) {
    changePasswordMutation({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu hiện tại</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Đang cập nhật..." : "Đổi mật khẩu"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
