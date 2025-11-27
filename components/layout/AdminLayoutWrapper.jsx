"use client";

import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function AdminLayoutWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileNav />
      <div className="md:pl-64">
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
