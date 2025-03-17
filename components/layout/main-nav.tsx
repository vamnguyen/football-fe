import Link from "next/link";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Trang chủ
      </Link>
      <Link
        href="/predictions"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Dự đoán
      </Link>
      <Link
        href="/community"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Cộng đồng
      </Link>
      <Link
        href="/challenges"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Thách đấu
      </Link>
    </nav>
  );
}
