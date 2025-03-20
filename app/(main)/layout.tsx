import { Header } from "@/components/shared/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col max-w-screen-xl mx-auto">
      <Header />
      <main className="flex-1 py-6">{children}</main>
    </div>
  );
}
