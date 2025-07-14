import React from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpg';
interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Ótica do Brasil"
                            className="h-12 w-12 rounded-full ring-2 ring-white/30"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
                    </div>
                    <div className="ml-4">
                        <h1 className="text-2xl font-light text-white tracking-wide">Ótica do Brasil</h1>
                        <p className="text-sm text-blue-200 font-light">Um jeito melhor de ver a vida! 👓</p>
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
                        href="https://linktr.ee/hightechnologydigital"
                        className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-light tracking-wide group relative after:content-[''] after:block after:h-[2px] after:bg-blue-300 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Agendar Consulta
                        <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={16} />
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
                        <a href="#home" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light">Início</a>
                        <a href="#multifocais" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light">Multifocais</a>
                        <a href="#beneficios" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light">Benefícios</a>
                        <a href="#contato" className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all font-light">Contato</a>
                        <a
                            href="https://linktr.ee/hightechnologydigital"
                            className="block px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all font-light"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Agendar Consulta
                        </a>
                    </div>
                </div>
            )}
        </div>
    </header>
);

export default Header; 