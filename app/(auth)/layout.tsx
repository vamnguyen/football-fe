import Image from "next/image";
import { authBackground } from "@/assets/images";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={authBackground}
          alt="Football stadium background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">{children}</div>
      </div>
    </div>
  );
}
