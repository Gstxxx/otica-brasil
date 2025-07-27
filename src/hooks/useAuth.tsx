"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  customer?: Record<string, unknown>;
  admin?: Record<string, unknown>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  // Adicionar um useEffect para recarregar a autenticação quando a página for focada
  useEffect(() => {
    const handleFocus = () => {
      if (!user && !loading) {
        checkAuth();
      }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [user, loading]);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/me");

      if (response.ok) {
        const responseData = await response.json();
        console.log("✅ Auth check successful:", responseData);

        if (responseData.data && responseData.data.user) {
          console.log("✅ User data found:", responseData.data.user.email);
          setUser(responseData.data.user);
        } else {
          console.log("❌ User data is undefined in response");
          setUser(null);
        }
      } else {
        console.log("❌ Auth check failed:", response.status);
        setUser(null);
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no login");
      }

      setUser(data.data.user);

      // Redirecionar baseado no role do usuário
      if (data.data.user.role === "ADMIN") {
        router.push("/dashboard");
      } else {
        router.push("/my-area");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  const refreshAuth = async () => {
    try {
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
      });

      if (!response.ok) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao renovar autenticação:", error);
      setUser(null);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
