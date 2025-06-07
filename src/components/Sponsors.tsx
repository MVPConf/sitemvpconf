import React from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { useSponsors } from '../hooks/useSponsors';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  website: string;
}

const Sponsors: React.FC = () => {
  const { sponsors, loading, error, refreshSponsors } = useSponsors();

  const tierConfig = {
    platinum: {
      title: "Patrocinadores Platinum",
      gridCols: "grid-cols-1 md:grid-cols-2",
      logoSize: "h-20",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-200",
      borderColor: "border-gray-300"
    },
    gold: {
      title: "Patrocinadores Gold",
      gridCols: "grid-cols-2 md:grid-cols-3",
      logoSize: "h-16",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200"
    },
    silver: {
      title: "Patrocinadores Silver",
      gridCols: "grid-cols-2 md:grid-cols-4",
      logoSize: "h-12",
      bgColor: "bg-gradient-to-br from-gray-50 to-gray-100",
      borderColor: "border-gray-200"
    }
  };

  const getSponsorsByTier = (tier: 'platinum' | 'gold' | 'silver') => {
    return sponsors.filter(sponsor => sponsor.tier === tier);
  };

  const getPlaceholderLogo = (name: string) => {
    const colors = ['0078D4', '1e40af', '059669', 'dc2626', '7c3aed', 'ea580c'];
    const colorIndex = name.length % colors.length;
    const color = colors[colorIndex];
    const initials = name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
    
    return `https://via.placeholder.com/200x100/${color}/FFFFFF?text=${encodeURIComponent(initials)}`;
  };

  const renderSponsorTier = (tier: 'platinum' | 'gold' | 'silver') => {
    const sponsorsInTier = getSponsorsByTier(tier);
    if (sponsorsInTier.length === 0) return null;

    const config = tierConfig[tier];

    return (
      <div key={tier} className="mb-16">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          {config.title}
        </h3>
        <div className={`grid ${config.gridCols} gap-6 max-w-6xl mx-auto`}>
          {sponsorsInTier.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`${config.bgColor} border-2 ${config.borderColor} rounded-xl p-8 flex items-center justify-center card-hover group transition-all duration-300`}
            >
              <img
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                className={`${config.logoSize} object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 max-w-full`}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = getPlaceholderLogo(sponsor.name);
                }}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="sponsors" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Nossos <span className="gradient-text">Patrocinadores</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresas que apoiam e impulsionam a comunidade Microsoft no Brasil
          </p>
        </div>

        <div className="space-y-16">
          {renderSponsorTier('platinum')}
          {renderSponsorTier('gold')}
          {renderSponsorTier('silver')}
        </div> */}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-ms-blue-50 to-ms-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Quer ser nosso patrocinador?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Junte-se a nós e apoie a maior comunidade de especialistas Microsoft do Brasil. 
              Diversas oportunidades de patrocínio disponíveis.
            </p>
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-0 md:space-x-4">
              <button 
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Entre em Contato
              </button>
              <a
                href="MVPConfMidiaKit2025.pdf"
                className="btn-secondary"
                target="_blank"
              >
                Baixe nosso Media Kit
              </a>
            </div>
          </div>
        </div>        

        {/* Indicador de cache */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Dados atualizados automaticamente a cada 10 minutos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;