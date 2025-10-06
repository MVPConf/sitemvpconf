
import { ExternalLink, Sparkles, Zap } from 'lucide-react';

interface BuyTicketsProps {
  title: string;
}

const BuyTickets: React.FC<BuyTicketsProps> = ({ title }) => {
  return (
    <div className="text-center my-16 px-4">
      <div className="relative inline-block">
        {/* Efeito de brilho animado ao redor */}
        <div className="absolute -inset-1 bg-gradient-to-r from-ms-blue-500 via-cyan-500 to-ms-blue-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
        
        {/* Container do botão */}
        <div className="relative">
          <a
            href="https://www.hubingressos.com.br/evento/mvpconf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-6 bg-gradient-to-r from-ms-blue-600 via-ms-blue-700 to-cyan-600 hover:from-ms-blue-700 hover:via-cyan-600 hover:to-ms-blue-800 text-white text-2xl font-black rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-ms-blue-500/50 overflow-hidden"
          >
            {/* Efeito de brilho que passa */}
            <div className="absolute inset-0 w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 group-hover:translate-x-full transition-all duration-700"></div>
            </div>
            
            {/* Ícone esquerda */}
            <Sparkles className="w-7 h-7 animate-spin-slow" />
            
            {/* Texto */}
            <span className="relative uppercase tracking-wider drop-shadow-2xl">
              {title}
            </span>
            
            {/* Ícone direita */}
            <ExternalLink className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            
            {/* Pontos brilhantes */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-300 rounded-full animate-ping"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
          </a>
        </div>
      </div>

      {/* Badge de urgência */}
      <div className="mt-6 flex justify-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md animate-pulse"></div>
          <span className="relative flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-ms-blue-400 text-gray-900 font-black px-6 py-3 rounded-full text-lg shadow-xl uppercase tracking-wide">
            <Zap className="w-5 h-5 fill-current" />
            Vagas Limitadas!
            <Zap className="w-5 h-5 fill-current" />
          </span>
        </div>
      </div>

      {/* Texto complementar */}
      <p className="mt-4 text-gray-600 font-semibold text-sm">
        🎟️ Garanta seu lugar agora mesmo!
      </p>
    </div>
  );
};

export default BuyTickets;