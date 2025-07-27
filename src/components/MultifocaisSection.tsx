import React from "react";
import { Eye } from "lucide-react";

interface MultifocaisSectionProps {
  scrollY: number;
}

const MultifocaisSection: React.FC<MultifocaisSectionProps> = ({ scrollY }) => (
  <section id="multifocais" className="py-32 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div
        className="text-center mb-20"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        <h2 className="text-4xl md:text-6xl font-extralight text-white mb-6">
          O que são
          <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Lentes Multifocais?
          </span>
        </h2>
        <p className="text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
          As lentes multifocais são a solução perfeita para quem precisa de
          correção visual para diferentes distâncias em uma única lente,
          proporcionando praticidade e conforto no dia a dia.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: Eye,
            title: "Visão de Perto",
            desc: "Perfeita para leitura, celular e trabalhos detalhados. Zona otimizada para atividades próximas.",
            color: "from-blue-400/20 to-blue-600/20",
          },
          {
            icon: Eye,
            title: "Visão Intermediária",
            desc: "Ideal para computador, painel do carro e conversas. Transição suave entre as distâncias.",
            color: "from-purple-400/20 to-purple-600/20",
          },
          {
            icon: Eye,
            title: "Visão de Longe",
            desc: "Clareza total para dirigir, TV e paisagens. Campo visual amplo para atividades distantes.",
            color: "from-indigo-400/20 to-indigo-600/20",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 group"
            style={{
              transform: `translateY(${scrollY * (0.01 + index * 0.005)}px)`,
            }}
          >
            <div
              className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
            >
              <item.icon className="text-white" size={32} />
            </div>
            <h3 className="text-2xl font-light text-white mb-4 text-center">
              {item.title}
            </h3>
            <p className="text-white/70 font-light leading-relaxed text-center">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div
        className="backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/30 rounded-3xl p-12 text-center"
        style={{ transform: `translateY(${scrollY * 0.01}px)` }}
      >
        <h3 className="text-3xl font-light text-white mb-6">
          Uma Única Lente, Três Zonas de Visão
        </h3>
        <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
          Elimine a necessidade de múltiplos óculos. Com nossas lentes
          multifocais de última geração, você terá a liberdade de ver claramente
          em todas as situações do seu dia.
        </p>
      </div>
    </div>
  </section>
);

export default MultifocaisSection;
