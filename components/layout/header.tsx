import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              AI Football Predictor
            </span>
          </Link>
          <MainNav />
        </div>
      </div>
    </header>
  );
}
