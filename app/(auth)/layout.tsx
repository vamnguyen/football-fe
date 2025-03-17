import Image from "next/image";
import authBackground from "@/assets/images/auth-background.jpg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={authBackground}
          alt="Football stadium background"
          fill
          className="object-cover opacity-75"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">{children}</div>
    </div>
  );
}
