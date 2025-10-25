import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    // { name: 'Início', href: '#hero' },
    { name: 'Sobre o Evento', href: '#sobre-evento' },
    { name: 'Galeria', href: '#Carousel' },
    { name: 'Palestrantes', href: '#speakers' },
    { name: 'Agenda', href: 'https://www.mvpconf.com.br/agenda/index.html', external: true },
    { name: 'Patrocinadores', href: '#sponsors' },
    { name: 'Local', href: '#location' },
    { name: 'Ingressos', href: '#tickets' },
    { name: 'Conselho', href: '#board' },
    { name: 'Contato', href: '#contact' },
  ];

  const scrollToSection = (href: string, external?: boolean) => {
    if (external) {
      window.location.href = href;
      setIsOpen(false);
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer"
               onClick={() => scrollToSection("#hero")} >
            <div className="p-2 bg-ms-white-600 rounded-lg">
              <img
                src="/logo_blue.png"
                alt="Logo MVP Conf"
                className="h-8 w-8 bg-ms-white-600 rounded-lg"
              />
              </div>
            <div>
              <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                MVP Conf
              </h1>
              <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-blue-100'}`}>
                2025 Brasil
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.external)}
                className={`font-medium transition-colors duration-300 hover:text-ms-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-200'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors z-[110] ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-xl mt-2 py-4 z-[105] relative">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href, item.external)}
                className="block w-full text-left px-6 py-3 text-gray-700 hover:bg-ms-blue-50 hover:text-ms-blue-600 font-medium transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;