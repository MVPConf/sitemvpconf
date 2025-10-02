import React from 'react';
import { Code, Heart } from 'lucide-react';

interface Creator {
  name: string;
  role: string;
}

const SiteCredits: React.FC = () => {
  const creators: Creator[] = [
    { name: 'Angelo Belchior', role: 'Desenvolvedor' },
    { name: 'Rafael Almeira', role: 'Desenvolvedor' }
  ];

  return (
    <div className="bg-gray-800 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>Desenvolvido com</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>por</span>
          </div>
          <div className="flex items-center space-x-4">
            {creators.map((creator, index) => (
              <React.Fragment key={creator.name}>
                {index > 0 && <span className="text-gray-600">•</span>}
                <span className="text-gray-300 font-medium">{creator.name}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCredits;