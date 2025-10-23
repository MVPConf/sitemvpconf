import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import CodeOfConduct from './CodeOfConduct';

type LegalPageType = 'privacy' | 'terms' | 'conduct' | null;

interface LegalPagesProps {
  initialPage?: LegalPageType;
  onClose?: () => void;
}

const LegalPages: React.FC<LegalPagesProps> = ({ initialPage = null, onClose }) => {
  const [currentPage, setCurrentPage] = useState<LegalPageType>(initialPage);

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      setCurrentPage(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'privacy':
        return <PrivacyPolicy onBack={handleBack} />;
      case 'terms':
        return <TermsOfUse onBack={handleBack} />;
      case 'conduct':
        return <CodeOfConduct onBack={handleBack} />;
      default:
        return null;
    }
  };

  // Se há uma página legal ativa, renderiza ela em tela cheia
  if (currentPage) {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        {renderPage()}
      </div>
    );
  }

  return null;
};

export default LegalPages;
