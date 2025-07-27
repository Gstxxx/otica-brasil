import React from "react";
import { Instagram, Eye, MapPin, Phone, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
const footerContacts = [
  {
    city: "Volta Redonda - RJ",
    address: "Volta Redonda - RJ",
    phone: "(24) 3348-0099",
    phoneHref: "tel:2433480099",
    instagram: "https://www.instagram.com/oticadobrasil_/",
    instagramHandle: "@oticadobrasil_",
  },
  {
    city: "Macaé - RJ",
    address: "Macaé - RJ",
    phone: "(22) 3081-3123",
    phoneHref: "tel:2230813123",
    instagram: "https://www.instagram.com/oticadobrasil_/",
    instagramHandle: "@oticadobrasil_",
  },
];

const Footer: React.FC = () => (
  <footer className="relative py-20 overflow-hidden">
    {/* Background with floating elements */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-slate-900/30 to-transparent backdrop-blur-sm">
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl animate-pulse delay-500" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse" />
            <Image
              src="/logo.jpg"
              alt="Ótica do Brasil"
              className="relative h-20 w-20 rounded-full border-2 border-white/30"
              height={20}
              width={20}
            />
            <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
              <Sparkles size={12} className="text-white" />
            </div>
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-extralight text-white mb-4">
          Ótica do Brasil
        </h2>
        <p className="text-xl text-white/70 font-light mb-2">
          Um jeito melhor de ver a vida! 👓
        </p>
        <div className="flex items-center justify-center text-white/60 font-light">
          <span>Feito com</span>
          <Heart size={16} className="mx-2 text-red-400 animate-pulse" />
          <span>para sua visão</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* About Section */}
        <div className="lg:col-span-1">
          <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 h-full">
            <div className="flex items-center mb-6">
              <Eye className="text-blue-300 mr-3" size={24} />
              <h3 className="text-xl font-light text-white">Nossa Missão</h3>
            </div>
            <p className="text-white/70 font-light leading-relaxed mb-6">
              Especialistas em lentes multifocais e cuidados com a visão.
              Utilizamos tecnologia avançada para proporcionar o máximo conforto
              visual e qualidade de vida.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/oticadobrasil_/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Instagram
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                href="https://linktr.ee/hightechnologydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center w-12 h-12 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Eye
                  size={20}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {footerContacts.map((contact, index) => (
            <div
              key={contact.city}
              className="group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 hover:from-white/15 hover:to-white/10 hover:border-white/30 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-light text-white">
                  {contact.city}
                </h4>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg flex items-center justify-center">
                  <MapPin size={16} className="text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center group/item">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-white/20 transition-all duration-300">
                    <MapPin size={16} className="text-white/80" />
                  </div>
                  <span className="text-white/80 font-light">
                    {contact.address}
                  </span>
                </div>

                <div className="flex items-center group/item">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-white/20 transition-all duration-300">
                    <Phone size={16} className="text-white/80" />
                  </div>
                  <a
                    href={contact.phoneHref}
                    className="text-white/80 hover:text-white transition-colors font-light"
                  >
                    {contact.phone}
                  </a>
                </div>

                <div className="flex items-center group/item">
                  <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-4 group-hover/item:bg-white/20 transition-all duration-300">
                    <Instagram size={16} className="text-white/80" />
                  </div>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors font-light"
                  >
                    {contact.instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center pt-8 border-t border-white/10">
        <div className="inline-flex items-center space-x-2 text-white/50 font-light">
          <span>© 2024</span>
          <div className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Ótica do Brasil</span>
          <div className="w-1 h-1 bg-white/30 rounded-full" />
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
