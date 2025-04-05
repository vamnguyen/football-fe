import Image from "next/image";
import { cn } from "@/lib/utils";

interface TeamLogoProps {
  teamName: string;
  className?: string;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  logo: string;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
};

export function TeamLogo({
  teamName,
  className,
  showName = true,
  size = "md",
  logo,
}: TeamLogoProps) {
  const logoSize = sizeMap[size];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        <Image
          src={logo}
          alt={`${teamName} logo`}
          fill
          className="object-contain"
          sizes="100%"
        />
      </div>
      {showName && <span className="font-medium text-sm">{teamName}</span>}
    </div>
  );
}
