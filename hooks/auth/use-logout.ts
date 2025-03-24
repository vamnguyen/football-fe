import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Đăng xuất thành công");
      router.push("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
