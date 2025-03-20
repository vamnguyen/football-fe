import Image from "next/image";
import { cn } from "@/lib/utils";
import { footballTeams } from "@/lib/constants";
import { FOOTBALL_TEAMS } from "@/lib/enum";

interface TeamLogoProps {
  teamName: string;
  className?: string;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
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
}: TeamLogoProps) {
  const logoSize = sizeMap[size];
  const team = footballTeams[teamName as FOOTBALL_TEAMS];

  if (!team) {
    console.warn(`Team logo not found for: ${teamName}`);
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        <Image
          src={team.logo}
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
