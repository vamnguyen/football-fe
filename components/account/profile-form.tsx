"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/services/auth";
import { toast } from "react-hot-toast";
import { profileSchema, ProfileSchemaType } from "@/lib/validation";
import { ProfileFormProps } from "@/lib/interface";

export function ProfileForm({ initialData }: ProfileFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      avatar: initialData.avatar || null,
      preferences: {
        favoriteTeam: initialData.preferences?.favoriteTeam || null,
      },
    },
  });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Cập nhật thông tin thành công");
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin");
    },
  });

  function onSubmit(values: ProfileSchemaType) {
    updateProfileMutation(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập họ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preferences.favoriteTeam"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đội yêu thích</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đội" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="manutd">Manchester United</SelectItem>
                    <SelectItem value="liverpool">Liverpool</SelectItem>
                    <SelectItem value="arsenal">Arsenal</SelectItem>
                    <SelectItem value="chelsea">Chelsea</SelectItem>
                    <SelectItem value="tottenham">Tottenham</SelectItem>
                    <SelectItem value="city">Manchester City</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
