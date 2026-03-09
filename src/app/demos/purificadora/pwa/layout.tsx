"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PWALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Nota de que es simulacion */}
      <div className="bg-sky-50 border-b border-sky-100 px-4 py-2 flex items-center justify-between">
        <Link
          href="/demos/purificadora"
          className="flex items-center gap-1 text-xs text-sky-600 hover:text-sky-700"
        >
          <ArrowLeft className="h-3 w-3" />
          Volver al dashboard
        </Link>
        <span className="text-[10px] text-sky-500 font-medium">
          SIMULACION PWA
        </span>
      </div>
      {children}
    </div>
  );
}
