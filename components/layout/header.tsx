import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-10">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              FootPred Community
            </span>
          </Link>
          <MainNav />
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component will go here */}
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Đăng nhập
            </Button>
            <Button size="sm">Đăng ký</Button>
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
