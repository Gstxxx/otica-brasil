import React from 'react';
import { Shield, Heart, Star, Eye } from 'lucide-react';

interface BenefitsSectionProps {
    scrollY: number;
}

const BenefitsSection: React.FC<BenefitsSectionProps> = ({ scrollY }) => (
    <section id="beneficios" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
                className="text-center mb-20"
                style={{ transform: `translateY(${scrollY * 0.015}px)` }}
            >
                <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6">
                    Por que Escolher
                    <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                        Nossas Lentes?
                    </span>
                </h2>
                <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
                    Na Ótica do Brasil, oferecemos as mais avançadas tecnologias em lentes multifocais
                    para garantir o melhor da sua visão.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                {[
                    { icon: Shield, title: "Tecnologia Avançada", desc: "Lentes com tecnologia de ponta que garantem adaptação rápida e visão natural.", color: "from-blue-400/20 to-blue-600/20" },
                    { icon: Heart, title: "Conforto Total", desc: "Eliminação de distorções e desconforto, proporcionando uso prolongado sem fadiga.", color: "from-purple-400/20 to-purple-600/20" },
                    { icon: Star, title: "Qualidade Premium", desc: "Materiais de alta qualidade com tratamentos anti-reflexo e proteção UV.", color: "from-indigo-400/20 to-indigo-600/20" },
                    { icon: Eye, title: "Adaptação Rápida", desc: "Design otimizado para adaptação rápida e natural, sem período de desconforto.", color: "from-cyan-400/20 to-cyan-600/20" }
                ].map((item, index) => (
                    <div
                        key={index}
                        className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 group"
                        style={{ transform: `translateY(${scrollY * (0.008 + index * 0.003)}px)` }}
                    >
                        <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-light text-white mb-4">{item.title}</h3>
                        <p className="text-white/70 font-light leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
                style={{ transform: `translateY(${scrollY * 0.005}px)` }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="p-12">
                        <h3 className="text-3xl font-light text-white mb-8">
                            Atendimento Especializado
                        </h3>
                        <div className="space-y-6">
                            {[
                                { icon: Eye, title: "Consulta Personalizada", desc: "Avaliação completa das suas necessidades visuais" },
                                { icon: Shield, title: "Garantia de Qualidade", desc: "Produtos com garantia e suporte pós-venda" },
                                { icon: Heart, title: "Acompanhamento Contínuo", desc: "Suporte durante todo o processo de adaptação" }
                            ].map((item, index) => (
                                <div key={index} className="flex items-start group">
                                    <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 mt-1 group-hover:bg-white/30 transition-all duration-300">
                                        <item.icon className="text-white" size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-light text-white text-lg mb-1">{item.title}</h4>
                                        <p className="text-white/70 font-light">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-xl p-12 text-white border-l border-white/20">
                        <h3 className="text-3xl font-light mb-8">Pronto para Transformar sua Visão?</h3>
                        <p className="text-white/80 mb-10 font-light leading-relaxed text-lg">
                            Agende uma consulta e descubra como as lentes multifocais podem revolucionar
                            a sua qualidade de vida e visão.
                        </p>
                        <a
                            href="https://linktr.ee/hightechnologydigital"
                            className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-8 py-4 rounded-full font-light tracking-wide hover:bg-white/30 transition-all duration-300 inline-flex items-center group"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Agendar Agora
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                {/* ArrowRight ícone pode ser adicionado aqui se necessário */}
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default BenefitsSection; 