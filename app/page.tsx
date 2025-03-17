import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4">
      <div className="text-center space-y-6 max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Dự đoán bóng đá với{" "}
          <span className="text-blue-600">AI thông minh</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Tham gia cộng đồng FootPred để nhận dự đoán chính xác, thách đấu với
          bạn bè và theo dõi các giải đấu hàng đầu thế giới.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-lg py-6 px-8"
          >
            <Link href="/sign-up">Đăng ký ngay</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="text-lg py-6 px-8 border-2"
          >
            <Link href="/sign-in">Đăng nhập</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Dự đoán AI</h3>
          <p className="text-gray-600">
            Thuật toán AI tiên tiến phân tích hàng nghìn trận đấu để đưa ra dự
            đoán chính xác nhất.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Cộng đồng</h3>
          <p className="text-gray-600">
            Tham gia cộng đồng người hâm mộ bóng đá, chia sẻ dự đoán và thảo
            luận về các trận đấu.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-600"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Thách đấu</h3>
          <p className="text-gray-600">
            Tạo và tham gia các thách đấu dự đoán với bạn bè, đồng nghiệp hoặc
            cộng đồng.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-24 w-full max-w-6xl bg-blue-600 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          Cộng đồng FootPred
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold">10K+</div>
            <div className="text-sm mt-1">Người dùng</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">99%</div>
            <div className="text-sm mt-1">Độ chính xác</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">5K+</div>
            <div className="text-sm mt-1">Trận đấu</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">100M+</div>
            <div className="text-sm mt-1">Tiền thưởng</div>
          </div>
        </div>
      </div>
    </div>
  );
}
