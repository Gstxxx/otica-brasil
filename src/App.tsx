import React, { useState, useEffect } from 'react';
import { Menu, X, Eye, Shield, Heart, Star, Phone, MapPin, Instagram, ArrowRight, Sparkles } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 opacity-30">
        <div 
          className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-20 left-1/2 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <img 
                  src="https://instagram.fstu5-1.fna.fbcdn.net/v/t51.2885-19/466804734_1570308417701840_482731825239656749_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fstu5-1.fna.fbcdn.net&_nc_cat=108&_nc_oc=Q6cZ2QG32HhImv6nmxE-OsADxjdp1GZ0uFt9fO-377Hoe1R1YmBPt1dPnfLTyQLVE7Z7J77V3QhtuYEiJck0DQHKKiZl&_nc_ohc=O1yO8x_vcMkQ7kNvwEX3ZO6&_nc_gid=yd9UV53uCEs1Oml6YZ4ZVA&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AfSk3Uw_vv1tLPWOHwaSxzpa9dPZLxnJFEOkiJVw3cyaKw&oe=687A1A1D&_nc_sid=22de04"
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
              <a href="#home" className="text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide">Início</a>
              <a href="#multifocais" className="text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide">Multifocais</a>
              <a href="#beneficios" className="text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide">Benefícios</a>
              <a href="#contato" className="text-white/80 hover:text-white transition-all duration-300 font-light tracking-wide">Contato</a>
              <a 
                href="https://linktr.ee/hightechnologydigital" 
                className="backdrop-blur-md bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-light tracking-wide group"
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div 
              className="text-center lg:text-left"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="inline-flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-8">
                <Sparkles className="text-blue-300 mr-2" size={20} />
                <span className="text-white font-light tracking-wide">Tecnologia Avançada em Lentes</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-extralight text-white mb-8 leading-tight">
                Lentes
                <span className="block font-light bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Multifocais
                </span>
                <span className="block text-4xl md:text-5xl font-thin text-blue-200">
                  de Alta Tecnologia
                </span>
              </h2>
              
              <p className="text-xl text-white/80 mb-12 leading-relaxed font-light max-w-2xl">
                Descubra a liberdade de ver perfeitamente em todas as distâncias. 
                Nossas lentes multifocais proporcionam uma visão natural e confortável 
                para o seu dia a dia.
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
                  <h3 className="text-2xl font-light text-white mb-3">Visão Perfeita em Todas as Distâncias</h3>
                  <p className="text-white/70 font-light">Tecnologia avançada para o seu conforto visual</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multifocais Section */}
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
              As lentes multifocais são a solução perfeita para quem precisa de correção 
              visual para diferentes distâncias em uma única lente, proporcionando praticidade 
              e conforto no dia a dia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Eye, title: "Visão de Perto", desc: "Perfeita para leitura, celular e trabalhos detalhados. Zona otimizada para atividades próximas.", color: "from-blue-400/20 to-blue-600/20" },
              { icon: Eye, title: "Visão Intermediária", desc: "Ideal para computador, painel do carro e conversas. Transição suave entre as distâncias.", color: "from-purple-400/20 to-purple-600/20" },
              { icon: Eye, title: "Visão de Longe", desc: "Clareza total para dirigir, TV e paisagens. Campo visual amplo para atividades distantes.", color: "from-indigo-400/20 to-indigo-600/20" }
            ].map((item, index) => (
              <div 
                key={index}
                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 group"
                style={{ transform: `translateY(${scrollY * (0.01 + index * 0.005)}px)` }}
              >
                <div className={`bg-gradient-to-br ${item.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-light text-white mb-4 text-center">{item.title}</h3>
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
            <h3 className="text-3xl font-light text-white mb-6">Uma Única Lente, Três Zonas de Visão</h3>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              Elimine a necessidade de múltiplos óculos. Com nossas lentes multifocais de última geração, 
              você terá a liberdade de ver claramente em todas as situações do seu dia.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
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
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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

      {/* Footer */}
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
    </div>
  );
}

export default App;