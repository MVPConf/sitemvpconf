import React, { useState } from 'react';
import { useSponsors } from '../hooks/useSponsors';

const Sponsors: React.FC = () => {
  const { sponsors } = useSponsors();
  const [hiddenSponsors, setHiddenSponsors] = useState<Set<number>>(new Set());

  const tierConfig = {
    platinum: {
      title: "Patrocinadores Platinum",
      badge: "💎 Platinum",
      gridCols: "grid-cols-1 lg:grid-cols-2",
      logoSize: "h-24",
      cardPadding: "p-10",
      bgGradient: "bg-white",
      borderGlow: "border-slate-300 hover:border-slate-400 hover:shadow-xl",
      badgeColor: "bg-gradient-to-r from-slate-700 to-slate-900 text-white"
    },
    gold: {
      title: "Patrocinadores Gold",
      badge: "🏆 Gold",
      gridCols: "grid-cols-2 lg:grid-cols-3",
      logoSize: "h-20",
      cardPadding: "p-8",
      bgGradient: "bg-white",
      borderGlow: "border-amber-300 hover:border-amber-400 hover:shadow-xl",
      badgeColor: "bg-gradient-to-r from-amber-500 to-orange-600 text-white"
    },
    silver: {
      title: "Patrocinadores Silver",
      badge: "⭐ Silver",
      gridCols: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      logoSize: "h-16",
      cardPadding: "p-6",
      bgGradient: "bg-white",
      borderGlow: "border-gray-300 hover:border-gray-400 hover:shadow-xl",
      badgeColor: "bg-gradient-to-r from-gray-600 to-slate-700 text-white"
    }
  };

  const getSponsorsByTier = (tier: 'platinum' | 'gold' | 'silver') => {
    return sponsors.filter(sponsor => sponsor.tier === tier);
  };

  // Quando a imagem não carregar, ocultamos apenas a imagem (mantemos o card)
  const handleImageError = (id: number) => {
    setHiddenSponsors(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const renderSponsorTier = (tier: 'platinum' | 'gold' | 'silver') => {
    const sponsorsInTier = getSponsorsByTier(tier);
    if (sponsorsInTier.length === 0) return null;

    const config = tierConfig[tier];

    return (
      <div key={tier} className="mb-20">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className={`${config.badgeColor} px-8 py-3 rounded-full text-lg md:text-xl font-bold shadow-lg`}>
            {config.badge}
          </div>
        </div>
        
        <div className={`grid ${config.gridCols} gap-6 max-w-7xl mx-auto`}>
          {sponsorsInTier.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${config.bgGradient} border-2 ${config.borderGlow} rounded-2xl ${config.cardPadding} flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden`}
            >
              {/* Efeito de brilho no hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>

              {sponsor.logo && !hiddenSponsors.has(sponsor.id) ? (
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className={`${config.logoSize} object-contain transition-all duration-300 max-w-full relative z-10`}
                  onError={() => handleImageError(sponsor.id)}
                  loading="lazy"
                />
              ) : (
                <div className={`${config.logoSize} w-full flex items-center justify-center relative z-10`}>
                  <span className="text-lg md:text-xl font-semibold text-gray-700 group-hover:text-gray-900 text-center px-2 break-words">
                    {sponsor.name}
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-br from-white via-ms-light-50 to-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-ms-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-0 w-72 h-72 bg-ms-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="gradient-text">Patrocinadores</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas que apoiam e impulsionam a comunidade Microsoft no Brasil
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-ms-blue-600 to-ms-blue-800 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="space-y-16">
          {renderSponsorTier('platinum')}
          {renderSponsorTier('gold')}
          {renderSponsorTier('silver')}
        </div>

        {/* CTA para novos patrocinadores */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-ms-blue-600 to-ms-blue-800 rounded-3xl p-10 md:p-14 shadow-2xl relative overflow-hidden">
            {/* Pattern de fundo */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)'
              }}></div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Quer ser nosso patrocinador?
              </h3>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Junte-se a nós e apoie a maior comunidade de especialistas Microsoft do Brasil. 
                Diversas oportunidades de patrocínio disponíveis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white text-ms-blue-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Entre em Contato
                </button>
                <a
                  href="MVPConfMidiaKit2025.pdf"
                  className="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white hover:bg-opacity-30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  target="_blank"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Baixar Media Kit
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;