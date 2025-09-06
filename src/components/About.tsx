import React from 'react';
import BuyTickets from './BuyTickets';


const SobreEvento: React.FC = () => (
  <section id="sobre-evento" className="py-20 bg-blue-100">
    <div className="max-w-4xl mx-auto px-4 text-center">

    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
    Sobre o <span className="gradient-text">Evento</span>
    </h2>

      <p className="text-lg text-gray-700 mb-4">
        O MVP Conf foi idealizado por Heber Lopes, João Benito e André Ruschel, e nasceu em 2018 como um evento criado pela comunidade Microsoft MVP.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Desde então, temos compartilhado conhecimento técnico, conectado pessoas e gerado impacto social nas comunidades do Brasil.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Toda a arrecadação proveniente da venda de ingressos é integralmente destinada a instituições sem fins lucrativos, e todos os profissionais envolvidos atuam de forma voluntária.
      </p>
      <p className="text-lg text-gray-700">
        Já são mais de 10.000 pessoas impactadas e mais de meio milhão de reais doados a instituições sem fins lucrativos.
      </p>
    </div>

  
  <BuyTickets title="Adquira seu Ingresso" />

  </section>
);

export default SobreEvento;
