"use client";

import { DemoSidebar } from "@/components/shared/demo-sidebar";
import {
  MessageCircle,
  BarChart3,
} from "lucide-react";

const navigation = [
  {
    name: "Chatbot",
    href: "/demos/chatbot",
    icon: MessageCircle,
    description: "Simulador WhatsApp",
  },
  {
    name: "Analytics",
    href: "/demos/chatbot/analytics",
    icon: BarChart3,
    description: "Metricas y conversiones",
  },
];

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <DemoSidebar
        navigation={navigation}
        title="AUTOPARTES EXPRESS"
        subtitle="Chatbot WhatsApp con IA"
      />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
