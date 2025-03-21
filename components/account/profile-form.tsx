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
import { profileSchema, ProfileSchemaType } from "@/lib/validation";
import { ProfileFormProps } from "@/lib/interface";
import { FOOTBALL_TEAMS } from "@/lib/enum";
import useUpdateProfile from "@/hooks/user/use-update-profile";

export function ProfileForm({ initialData }: ProfileFormProps) {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialData.firstName || "",
      lastName: initialData.lastName || "",
      favoriteTeam: initialData.favoriteTeam || null,
    },
  });
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();

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
            name="favoriteTeam"
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
                    {Object.values(FOOTBALL_TEAMS).map((team) => (
                      <SelectItem key={team} value={team}>
                        {team}
                      </SelectItem>
                    ))}
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
