"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, Sprout, Map, BarChart3, CalendarDays } from "lucide-react";

const tabs = [
  { name: "Mapa", href: "/demos/agro", icon: Map },
  { name: "Forecast", href: "/demos/agro/forecast", icon: BarChart3 },
  { name: "Planner", href: "/demos/agro/planner", icon: CalendarDays },
];

export default function AgroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <Image src="/images/rushdata-logo.png" alt="RushData" width={24} height={24} className="rounded" />
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-primary" />
                <div>
                  <span className="font-semibold text-sm">AGROVISTA</span>
                  <span className="text-xs text-muted-foreground ml-2">Inteligencia de Cultivos</span>
                </div>
              </div>
            </div>
          </div>
          {/* Tab Navigation */}
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors",
                    isActive
                      ? "border-primary text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">{children}</main>
    </div>
  );
}
