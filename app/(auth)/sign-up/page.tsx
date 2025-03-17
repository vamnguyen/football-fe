import { Globe } from "lucide-react";
import { SignUpForm } from "@/components/auth/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[900px] grid-cols-1 md:grid-cols-2 gap-8">
        <SignUpForm />

        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-600/80 to-green-800/80 backdrop-blur-sm rounded-lg p-8 text-white shadow-lg">
          <div className="mb-4">
            <Globe className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            FootPred Community
          </h2>
          <p className="text-center mb-6">
            Tham gia cộng đồng dự đoán bóng đá, nhận phân tích chuyên sâu và
            thách đấu với bạn bè.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Miễn phí</div>
              <span className="text-sm">Đăng ký</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Dễ dàng</div>
              <span className="text-sm">Sử dụng</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Cập nhật</div>
              <span className="text-sm">Liên tục</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">Bảo mật</div>
              <span className="text-sm">Thông tin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
