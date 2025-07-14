import React from 'react';
import { Instagram, Eye } from 'lucide-react';

const Footer: React.FC = () => (
    <footer className="backdrop-blur-xl bg-black/20 border-t border-white/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                        <img
                            src="https://instagram.fstu5-1.fna.fbcdn.net/v/t51.2885-19/466804734_1570308417701840_482731825239656749_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fstu5-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QG32HhImv6nmxE-OsADxjdp1GZ0uFt9fO-377Hoe1R1YmBPt1dPnfLTyQLVE7Z7J77V3QhtuYEiJck0DQHKKiZl&_nc_ohc=O1yO8x_vcMkQ7kNvwEX3ZO6&_nc_gid=yd9UV53uCEs1Oml6YZ4ZVA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AfSk3Uw_vv1tLPWOHwaSxzpa9dPZLxnJFEOkiJVw3cyaKw&oe=687A1A1D&_nc_sid=22de04"
                            alt="Ótica do Brasil"
                            className="h-16 w-16 rounded-full ring-2 ring-white/30 mr-4"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-light text-white">Ótica do Brasil</h3>
                        <p className="text-white/70 font-light">Um jeito melhor de ver a vida! 👓</p>
                    </div>
                </div>
                <p className="text-white/60 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
                    Especialistas em lentes multifocais e cuidados com a visão.
                    Tecnologia avançada para o seu conforto visual.
                </p>
                <div className="flex justify-center space-x-6 mb-8">
                    <a
                        href="https://www.instagram.com/oticadobrasil_/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-md bg-white/10 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <Instagram size={24} />
                    </a>
                    <a
                        href="https://linktr.ee/hightechnologydigital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="backdrop-blur-md bg-white/10 p-4 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
                    >
                        <Eye size={24} />
                    </a>
                </div>
                <div className="pt-8 border-t border-white/20">
                    <p className="text-white/50 font-light">
                        © 2024 Ótica do Brasil. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer; 