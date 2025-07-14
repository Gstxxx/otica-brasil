import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
    scrollY: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollY }) => (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                    className="text-center lg:text-left"
                    style={{ transform: `translateY(${scrollY * 0.1}px)` }}
                >
                    <div className="inline-flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-8">
                        <Sparkles className="text-blue-300 mr-2" size={20} />
                        <span className="text-white font-light tracking-wide">
                            Lentes multifocais feitas sob medida
                        </span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 leading-tight">
                        Seu óculos
                        <span className="block font-light bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                            como você nunca viu
                        </span>
                        <span className="block text-4xl md:text-5xl font-thin text-blue-200">
                            Montagem exclusiva e personalizada
                        </span>
                    </h2>

                    <p className="text-xl text-white/80 mb-12 leading-relaxed font-light max-w-2xl">
                        Avaliamos as medidas do seu rosto, da lente e do óculos utilizando Inteligência Artificial.
                        Proporcionamos uma experiência única, com lentes multifocais feitas sob medida para você.
                        Seu óculos nunca teve uma montagem como a nossa.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                        <a
                            href="https://linktr.ee/hightechnologydigital"
                            className="backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-500/80 border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:from-blue-400/80 hover:to-purple-400/80 transition-all duration-300 shadow-2xl group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Agende sua Consulta
                            <ArrowRight className="inline ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        </a>
                        <a
                            href="#multifocais"
                            className="backdrop-blur-md bg-white/10 border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:bg-white/20 transition-all duration-300"
                        >
                            Saiba Mais
                        </a>
                    </div>
                </div>

                <div
                    className="relative"
                    style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                >
                    <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:bg-white/15 transition-all duration-500 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl" />
                        <img
                            src="https://images.pexels.com/photos/5765827/pexels-photo-5765827.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Lentes Multifocais"
                            className="w-full h-80 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="mt-6 text-center relative z-10">
                            <h3 className="text-2xl font-light text-white mb-3">
                                Medidas personalizadas com IA
                            </h3>
                            <p className="text-white/70 font-light">
                                Analisamos seu rosto, lente e armação para um resultado perfeito
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default HeroSection; 