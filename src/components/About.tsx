import React from 'react';
import BuyTickets from './BuyTickets';
import { useOngs } from '../hooks/useOngs';

const SobreEvento: React.FC = () => {
  const { ongs2025, ongsPrevious, loading } = useOngs();

  return (
  <section id="sobre-evento" className="py-20 bg-gradient-to-br from-white via-ms-light-50 to-ms-blue-50 relative overflow-hidden">
    {/* Elementos decorativos de fundo */}
    <div className="absolute top-0 left-0 w-96 h-96 bg-ms-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-ms-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Sobre o <span className="gradient-text">Evento</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-ms-blue-600 to-ms-blue-800 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* História */}
        <div className="bg-white rounded-2xl shadow-xl p-8 card-hover">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-ms-blue-600 to-ms-blue-800 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Nossa História</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            O MVP Conf foi idealizado por <span className="font-semibold text-ms-blue-700">André Ruschel, Heber Lopes e João Benito</span>, e nasceu em 2018 como um evento criado pela comunidade Microsoft MVP.
          </p>
        </div>

        {/* Missão */}
        <div className="bg-white rounded-2xl shadow-xl p-8 card-hover">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-ms-blue-600 to-ms-blue-800 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Nossa Missão</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Compartilhar conhecimento técnico, conectar pessoas e gerar impacto social nas comunidades do Brasil através da tecnologia.
          </p>
        </div>

        {/* Propósito Social */}
        <div className="bg-gradient-to-br from-ms-blue-50 to-white rounded-2xl shadow-xl p-8 card-hover border-2 border-ms-blue-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-ms-blue-600 to-ms-blue-800 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Propósito Social</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Toda a arrecadação da venda de ingressos é <span className="font-semibold text-ms-blue-700">100% destinada</span> a instituições sem fins lucrativos.
          </p>
          <p className="text-base text-gray-600">
            Todos os profissionais envolvidos atuam de forma voluntária, garantindo que cada centavo vá para quem realmente precisa.
          </p>
        </div>

        {/* Voluntariado */}
        <div className="bg-gradient-to-br from-ms-blue-50 to-white rounded-2xl shadow-xl p-8 card-hover border-2 border-ms-blue-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-ms-blue-600 to-ms-blue-800 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Trabalho Voluntário</h3>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Organização, palestras, coordenação - tudo é feito por <span className="font-semibold text-ms-blue-700">profissionais voluntários</span> dedicados a fazer a diferença.
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="bg-gradient-to-r from-ms-blue-600 to-ms-blue-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-16">
        <h3 className="text-3xl font-bold text-white text-center mb-10">Nosso Impacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">+10.000</div>
            <div className="text-xl text-blue-100">Pessoas Impactadas</div>
          </div>
          <div className="text-center p-6 bg-white bg-opacity-10 rounded-xl backdrop-blur-sm">
            <div className="text-5xl md:text-6xl font-bold text-white mb-2">+R$ 500K</div>
            <div className="text-xl text-blue-100">Doados para Instituições</div>
          </div>
        </div>
      </div>

      {/* ONGs Beneficiadas */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            <span className="gradient-text">ONGs Beneficiadas</span>
          </h3>
          <p className="text-lg text-gray-600">Instituições que receberam ou receberão nossas doações</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ONGs Beneficiadas em 2025 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Beneficiadas em 2025</h4>
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-gray-600">Carregando...</p>
              ) : ongs2025.length > 0 ? (
                ongs2025.map((ong) => (
                  <a 
                    key={ong.id}
                    href={ong.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 bg-gradient-to-r from-green-50 to-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold group-hover:text-green-600 transition-colors">{ong.name}</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-600">Em breve anunciaremos as ONGs beneficiadas</p>
              )}
            </div>
          </div>

          {/* ONGs Beneficiadas em Anos Anteriores */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-2xl font-bold text-gray-900">Anos Anteriores</h4>
            </div>
            <div className="space-y-3">
              {loading ? (
                <p className="text-gray-600">Carregando...</p>
              ) : ongsPrevious.length > 0 ? (
                ongsPrevious.map((ong) => (
                  <a 
                    key={ong.id}
                    href={ong.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 font-semibold group-hover:text-blue-600 transition-colors">{ong.name}</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))
              ) : (
                <p className="text-gray-600">Nenhuma ONG beneficiada anteriormente</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    <BuyTickets title="Adquira seu Ingresso" />
  </section>
  );
};

export default SobreEvento;
