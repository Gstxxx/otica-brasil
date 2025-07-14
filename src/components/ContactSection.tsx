import React from 'react';
import { MapPin, Phone, Instagram, ArrowRight } from 'lucide-react';

interface ContactSectionProps {
    scrollY: number;
}

const ContactSection: React.FC<ContactSectionProps> = ({ scrollY }) => (
    <section id="contato" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div
                className="text-center mb-20"
                style={{ transform: `translateY(${scrollY * 0.01}px)` }}
            >
                <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6">Entre em Contato</h2>
                <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
                    Estamos aqui para cuidar da sua visão. Visite uma de nossas lojas ou entre em contato conosco.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Volta Redonda */}
                <div
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-500"
                    style={{ transform: `translateY(${scrollY * 0.008}px)` }}
                >
                    <h3 className="text-2xl font-light mb-8 text-center text-white">Volta Redonda - RJ</h3>
                    <div className="space-y-6">
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <MapPin className="text-white" size={20} />
                            </div>
                            <span className="text-white/80 font-light">Volta Redonda - RJ</span>
                        </div>
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <Phone className="text-white" size={20} />
                            </div>
                            <a href="tel:2433480099" className="text-white/80 hover:text-white transition-colors font-light">
                                (24) 3348-0099
                            </a>
                        </div>
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <Instagram className="text-white" size={20} />
                            </div>
                            <a
                                href="https://www.instagram.com/oticadobrasil_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-colors font-light"
                            >
                                @oticadobrasil_
                            </a>
                        </div>
                    </div>
                </div>

                {/* Macaé */}
                <div
                    className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-500"
                    style={{ transform: `translateY(${scrollY * 0.012}px)` }}
                >
                    <h3 className="text-2xl font-light mb-8 text-center text-white">Macaé - RJ</h3>
                    <div className="space-y-6">
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <MapPin className="text-white" size={20} />
                            </div>
                            <span className="text-white/80 font-light">Macaé - RJ</span>
                        </div>
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <Phone className="text-white" size={20} />
                            </div>
                            <a href="tel:2230813123" className="text-white/80 hover:text-white transition-colors font-light">
                                (22) 3081-3123
                            </a>
                        </div>
                        <div className="flex items-center group">
                            <div className="backdrop-blur-md bg-white/20 rounded-full p-3 mr-4 group-hover:bg-white/30 transition-all duration-300">
                                <Instagram className="text-white" size={20} />
                            </div>
                            <a
                                href="https://www.instagram.com/oticadobrasil_/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-colors font-light"
                            >
                                @oticadobrasil_
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <a
                    href="https://linktr.ee/hightechnologydigital"
                    className="backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-500/80 border border-white/30 text-white px-12 py-5 rounded-full font-light tracking-wide hover:from-blue-400/80 hover:to-purple-400/80 transition-all duration-300 shadow-2xl inline-flex items-center group text-lg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Agende sua Consulta
                    <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={24} />
                </a>
            </div>
        </div>
    </section>
);

export default ContactSection; 