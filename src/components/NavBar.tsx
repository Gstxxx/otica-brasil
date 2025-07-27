"use client";
import React from "react";
import { Menu, X, ArrowRight, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { user, logout, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <img
                src="/logo.jpg"
                alt="Ótica do Brasil"
                className="h-12 w-12 rounded-full ring-2 ring-white/30"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-light text-white tracking-wide">
                Ótica do Brasil
              </h1>
              <p className="text-sm text-blue-200 font-light">
                Um jeito melhor de ver a vida! 👓
              </p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="relative text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Início
            </a>
            <a
              href="#multifocais"
              className="relative text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Multifocais
            </a>
            <a
              href="#beneficios"
              className="relative text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Benefícios
            </a>
            <a
              href="#contato"
              className="relative text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Contato
            </a>
            <a
              href="/buy-now"
              className="relative text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
            >
              Comprar Lentes
            </a>
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-white">
                      <User size={20} />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <LogOut size={18} />
                      <span>Sair</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/login"
                      className="text-white/80 hover:text-white transition-all duration-300 font-light"
                    >
                      Entrar
                    </Link>
                    <Link
                      href="/register"
                      className="relative inline-flex items-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-indigo-500/80 shadow-lg border border-white/30 text-white font-medium tracking-wide transition-all duration-300 hover:from-blue-400/90 hover:via-purple-400/90 hover:to-indigo-400/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 group"
                      style={{
                        boxShadow: "0 4px 24px 0 rgba(80, 80, 255, 0.15)",
                      }}
                    >
                      <span className="text-lg font-light">Registrar</span>
                    </Link>
                  </div>
                )}
              </>
            )}
            <a
              href="https://linktr.ee/hightechnologydigital"
              className="relative inline-flex items-center gap-3 px-7 py-3 rounded-xl bg-gradient-to-r from-blue-500/80 via-purple-500/80 to-indigo-500/80 shadow-lg border border-white/30 text-white font-medium tracking-wide transition-all duration-300 hover:from-blue-400/90 hover:via-purple-400/90 hover:to-indigo-400/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 group"
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "0 4px 24px 0 rgba(80, 80, 255, 0.15)" }}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <ArrowRight
                  className="text-blue-200 group-hover:text-white transition-colors duration-300"
                  size={18}
                />
              </span>
              <span className="text-lg font-light">Verificar preço</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white backdrop-blur-md bg-white/20 p-2 rounded-full"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/10 border-t border-white/20 rounded-b-2xl">
            <div className="px-4 pt-4 pb-6 space-y-3">
              <a
                href="#home"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
              >
                Início
              </a>
              <a
                href="#multifocais"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
              >
                Multifocais
              </a>
              <a
                href="#beneficios"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
              >
                Benefícios
              </a>
              <a
                href="#contato"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
              >
                Contato
              </a>
              <a
                href="/buy-now"
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
              >
                Comprar Lentes
              </a>
              {!loading && (
                <>
                  {user ? (
                    <>
                      <div className="px-4 py-3 text-white/80 border-t border-white/20">
                        <div className="flex items-center space-x-2">
                          <User size={20} />
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light flex items-center space-x-2"
                      >
                        <LogOut size={18} />
                        <span>Sair</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light"
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all font-light"
                      >
                        Registrar
                      </Link>
                    </>
                  )}
                </>
              )}
              <a
                href="https://linktr.ee/hightechnologydigital"
                className="block px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all font-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                Verificar preço
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
