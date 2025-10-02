import React from 'react';
import { Mail, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useLegalPages } from './LegalPages';
import SiteCredits from './SiteCredits';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { openPrivacyPolicy, openTermsOfUse, openCodeOfConduct, LegalPagesComponent } = useLegalPages();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6 cursor-pointer"
              onClick={() => scrollToSection("#hero")}
              >
                <div className="p-2 bg-ms-white-600 rounded-lg">
                  <img
                    src="/logo_blue.png"
                    alt="Logo MVP Conf"
                    className="h-8 w-8 bg-ms-white-600 rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">MVP Conf</h3>
                  <p className="text-gray-400">2025 Brasil</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                O maior evento de especialistas Microsoft do Brasil. Conectando comunidades, 
                compartilhando conhecimento e inspirando inovação.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/MVPConference" className="p-2 bg-gray-800 rounded-lg hover:bg-ms-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://twitter.com/MVPConference" className="p-2 bg-gray-800 rounded-lg hover:bg-ms-blue-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/company/mvp-conf" className="p-2 bg-gray-800 rounded-lg hover:bg-ms-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/mvpconf/" className="p-2 bg-gray-800 rounded-lg hover:bg-ms-blue-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/@mvpconf" className="p-2 bg-gray-800 rounded-lg hover:bg-ms-blue-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => document.querySelector('#speakers')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Palestrantes
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#schedule')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Agenda
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Ingressos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#location')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Localização
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#sponsors')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Patrocinadores
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Contato
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contato</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-ms-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">contato@mvpconf.com.br</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} MVP Conf Brasil. Todos os direitos reservados.
              </div>
              <div className="flex space-x-6 text-sm">
                <button 
                  onClick={openPrivacyPolicy}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Política de Privacidade
                </button>
                <button 
                  onClick={openTermsOfUse}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Termos de Uso
                </button>
                <button 
                  onClick={openCodeOfConduct}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Código de Conduta
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Site Credits */}
        <SiteCredits />
      </footer>
      
      {/* Render Legal Pages */}
      <LegalPagesComponent />
    </>
  );
};

export default Footer;