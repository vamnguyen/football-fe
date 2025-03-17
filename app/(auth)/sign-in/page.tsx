import { Globe } from "lucide-react";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="grid w-full max-w-[900px] grid-cols-1 md:grid-cols-2 gap-8">
        <SignInForm />

        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600/80 to-blue-800/80 backdrop-blur-sm rounded-lg p-8 text-white shadow-lg">
          <div className="mb-4">
            <Globe className="w-20 h-20" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-center">
            FootPred Community
          </h2>
          <p className="text-center mb-6">
            Dự đoán kết quả bóng đá với AI, tương tác với cộng đồng và tham gia
            các thách đấu hấp dẫn.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">99%</div>
              <span className="text-sm">Độ chính xác</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">10K+</div>
              <span className="text-sm">Người dùng</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">5K+</div>
              <span className="text-sm">Trận đấu</span>
            </div>
            <div className="bg-white/20 p-3 rounded-lg text-center">
              <div className="text-xl font-bold">100M+</div>
              <span className="text-sm">Tiền thưởng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
