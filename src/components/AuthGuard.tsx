"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({
  children,
  redirectTo = "/",
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Se o usuário está logado, redirecionar
      if (user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push(redirectTo);
      }
    }
  }, [user, loading, router, redirectTo]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se o usuário está logado, não mostrar o conteúdo
  if (user) {
    return null;
  }

  // Se não está logado, mostrar o conteúdo (páginas de login/registro)
  return <>{children}</>;
}
