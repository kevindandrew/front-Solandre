"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoginView from "@/components/layout/LoginView";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/admin/inicio");
    }
  }, [router]);

  const handleLogin = async () => {
    Cookies.set("token", "demo-token", {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    router.push("/admin/inicio");
  };

  return <LoginView onLogin={handleLogin} />;
}
