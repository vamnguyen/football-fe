"use client";

import ReactQueryProvider from "./react-query-provider";
import ToastProvider from "./toast-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ToastProvider />
      {children}
    </ReactQueryProvider>
  );
}
