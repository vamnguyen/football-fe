"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  stadiumHero,
  memeBongDa,
  landingAvatar1,
  landingAvatar2,
  landingAvatar3,
} from "@/assets/images";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0 rounded-md overflow-hidden">
          <Image
            src={stadiumHero}
            alt="Football stadium"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto text-white"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              AI Football{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                Predictor
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Dự đoán kết quả bóng đá với độ chính xác cao nhờ trí tuệ nhân tạo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                asChild
              >
                <Link href="/sign-up">Đăng ký ngay</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white/10"
                asChild
              >
                <Link href="/predictions">Xem dự đoán mới nhất</Link>
              </Button>
            </div>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
          >
            {[
              { value: "90%", label: "Độ chính xác" },
              { value: "10K+", label: "Người dùng" },
              { value: "50K+", label: "Dự đoán" },
              { value: "24/7", label: "Hỗ trợ" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Làm thế nào AI dự đoán bóng đá?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Công nghệ AI tiên tiến phân tích hàng triệu dữ liệu để đưa ra dự
              đoán chính xác
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Thu thập dữ liệu",
                description:
                  "Hệ thống thu thập dữ liệu từ hàng nghìn trận đấu, thông tin cầu thủ, đội bóng và các yếu tố khác",
                icon: "📊",
              },
              {
                title: "Phân tích AI",
                description:
                  "Mô hình học máy tiên tiến phân tích các mẫu và xu hướng từ dữ liệu lịch sử",
                icon: "🧠",
              },
              {
                title: "Dự đoán chính xác",
                description:
                  "Kết quả dự đoán được đưa ra với tỷ lệ chính xác cao, giúp bạn đưa ra quyết định sáng suốt",
                icon: "🎯",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Tabs */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các tính năng độc đáo giúp bạn dự đoán bóng đá tốt hơn
            </p>
          </div>

          <Tabs defaultValue="predictions" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="predictions">Dự đoán AI</TabsTrigger>
              <TabsTrigger value="challenges">Thách đấu</TabsTrigger>
              <TabsTrigger value="analysis">Phân tích chuyên sâu</TabsTrigger>
            </TabsList>
            <TabsContent value="predictions" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Dự đoán AI chính xác
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Dự đoán tỷ số chính xác với độ tin cậy cao",
                      "Cập nhật liên tục dựa trên dữ liệu mới nhất",
                      "Phân tích các yếu tố ảnh hưởng đến kết quả trận đấu",
                      "Thống kê chi tiết về lịch sử đối đầu",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Xem dự đoán
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={memeBongDa}
                    alt="AI Predictions"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="challenges" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={memeBongDa}
                    alt="Challenges"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Thách đấu cùng bạn bè
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Tạo và tham gia các thách đấu dự đoán với bạn bè",
                      "Bảng xếp hạng thời gian thực",
                      "Giải thưởng hấp dẫn cho người chiến thắng",
                      "Chia sẻ kết quả lên mạng xã hội",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Tham gia thách đấu
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="analysis" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Phân tích chuyên sâu
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Phân tích chi tiết về phong độ đội bóng",
                      "Thống kê cầu thủ với các chỉ số quan trọng",
                      "Biểu đồ trực quan hóa dữ liệu",
                      "Báo cáo chuyên sâu về chiến thuật",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-purple-500 mr-2">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                    Xem phân tích
                  </Button>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={memeBongDa}
                    alt="Analysis"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Người dùng nói gì về chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hàng nghìn người dùng đã tin tưởng và sử dụng dịch vụ của chúng
              tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Phạm Min Chín",
                role: "Fan bóng đá lâu năm",
                content:
                  "Tôi đã thử nhiều nền tảng dự đoán bóng đá nhưng AI Football Predictor là tốt nhất. Độ chính xác của các dự đoán thực sự ấn tượng!",
                avatar: landingAvatar1,
              },
              {
                name: "Lâm Tô",
                role: "Người chơi cá coi",
                content:
                  "Nhờ có AI Football Predictor, tôi đã cải thiện đáng kể tỷ lệ thắng của mình. Phân tích chuyên sâu giúp tôi đưa ra quyết định sáng suốt hơn.",
                avatar: landingAvatar2,
              },
              {
                name: "Elon Musk",
                role: "HLV bóng đá nghiệp dư",
                content:
                  "Tôi sử dụng nền tảng này để phân tích đối thủ và lên chiến thuật. Dữ liệu chi tiết và dự đoán chính xác đã giúp đội của tôi rất nhiều.",
                avatar: landingAvatar3,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    className="rounded-full mr-4 aspect-square object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-4 text-yellow-400">★★★★★</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-md">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng để dự đoán chính xác hơn?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Đăng ký ngay hôm nay và nhận 7 ngày dùng thử miễn phí với đầy đủ
              tính năng!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
              asChild
            >
              <Link href="/sign-up">Bắt đầu ngay - Miễn phí</Link>
            </Button>
            <p className="mt-4 text-sm text-blue-200">
              Không cần thẻ tín dụng. Hủy bất kỳ lúc nào.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fun Football Facts */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Những điều thú vị về bóng đá</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                fact: "Quả bóng đầu tiên được làm từ bàng quang lợn",
                icon: "🐷",
              },
              {
                fact: "Trận đấu dài nhất kéo dài 3 ngày 3 đêm",
                icon: "⏰",
              },
              {
                fact: "Cầu thủ chạy trung bình 9.5km mỗi trận",
                icon: "🏃",
              },
              {
                fact: "World Cup 2022 có 5 tỷ người xem trên toàn cầu",
                icon: "🌍",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <p>{item.fact}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
