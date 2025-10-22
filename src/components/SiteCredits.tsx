import React from 'react';
import pkg from '../../package.json';
import { Code, Heart, Linkedin } from 'lucide-react';

interface Creator {
  name: string;
  linkedinUrl: string;
}

const SiteCredits: React.FC = () => {
  const creators: Creator[] = [
    { name: 'Angelo Belchior', linkedinUrl: 'https://www.linkedin.com/in/angelobelchior/' },
    { name: 'Rafael Almeida',  linkedinUrl: 'https://www.linkedin.com/in/ralmsdeveloper/' },
    { name: 'Felipe Augusto',  linkedinUrl: 'https://www.linkedin.com/in/felipementel/' }
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
                <a
                  href={creator.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-gray-300 font-medium hover:text-white transition-colors group"
                >
                  <span>{creator.name}</span>
                  <Linkedin className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                </a>
              </React.Fragment>
            ))}
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="text-gray-500">v{pkg.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteCredits;
