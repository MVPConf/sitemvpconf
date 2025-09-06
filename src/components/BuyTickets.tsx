
import { ExternalLink } from 'lucide-react';

interface BuyTicketsProps {
  title: string;
}

const BuyTickets: React.FC<BuyTicketsProps> = ({ title }) => {
  return (
    <div className="text-center mb-16">
      <a
        href="https://www.hubingressos.com.br/evento/mvpconf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex mt-10 px-12 py-6 rounded-2xl bg-gradient-to-r from-ms-blue-500 via-ms-blue-600 to-blue-800 hover:from-ms-blue-600 hover:via-blue-700 hover:to-blue-900 text-white text-2xl font-extrabold shadow-2xl transition-all duration-300 items-center justify-center gap-3 animate-pulse ring-4 ring-ms-blue-300 ring-opacity-60 hover:scale-105 focus:outline-none focus:ring-8 focus:ring-ms-blue-400"
        style={{ boxShadow: '0 8px 32px 0 rgba(0, 64, 255, 0.25), 0 1.5px 8px 0 rgba(0, 64, 255, 0.10)' }}
      >
        <span className="drop-shadow-lg">{title}</span>
        <ExternalLink className="w-7 h-7 ml-3 drop-shadow-lg" aria-label="Abrir site externo" />
      </a>
      <div className="mt-4 flex justify-center">
        <span className="bg-yellow-300 text-ms-blue-900 font-bold px-4 py-2 rounded-full text-base shadow-md animate-bounce">Vagas limitadas!</span>
      </div>
    </div>
  );
};

export default BuyTickets;