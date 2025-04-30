import React from "react";
import "./globals.css";                // Import Tailwind directives
import { Inter } from "next/font/google"; // Example: Using Inter font
import Link from "next/link";
import type { Metadata } from "next";
// If using Lucide icons:
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Users,
  Banknote,
  PlugZap,
  Settings,
  PanelLeft,
  X,
  UserCircle,
} from "lucide-react";
import NavDropdown from "@/components/NavDropdown";
import Sidebar from "@/components/Sidebar";
import Echo from '@/components/Echo'

// Setup Inter font (optional)
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dynamis",
  description: "AI-Powered Business Management Platform",
};

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
  { name: "CRM", href: "/crm", icon: Users },
  { name: "Finances", href: "/finances", icon: Banknote },
  { name: "Integrations", href: "/integrations", icon: PlugZap },
  { name: "Settings", href: "/settings", icon: Settings },
];

const dropdownItems = [
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Sign out", href: "/logout" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <body className={`${inter.className} h-full`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />

          <div className="flex flex-col flex-1 overflow-hidden">
            <header className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
              <NavDropdown label="User Name" items={["Profile", "Settings", "Logout"]} />
            </header>

            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
        <Echo />
      </body>
    </html>
  );
}
