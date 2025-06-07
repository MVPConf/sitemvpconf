import React, { useState } from 'react';
import { Check, Star, Users, Gift, Sparkles, Crown, Zap, ArrowRight, Clock, Shield } from 'lucide-react';

interface TicketPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  premium?: boolean;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  borderGradient: string;
  badge?: string;
  description: string;
}

const Tickets: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const plans: TicketPlan[] = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 299,
      originalPrice: 399,
      description: 'Perfeito para quem quer garantir sua vaga com desconto especial',
      icon: <Gift className="h-7 w-7" />,
      color: 'text-emerald-600',
      bgGradient: 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100',
      borderGradient: 'bg-gradient-to-r from-emerald-400 to-green-500',
      badge: '25% OFF',
      features: [
        'Acesso completo aos 2 dias de evento',
        'Material exclusivo digital do evento',
        'Coffee breaks e almoços inclusos',
        'Certificado digital de participação',
        'Acesso às networking sessions',
        'Desconto especial de 25%',
        'Suporte prioritário'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 399,
      description: 'A escolha ideal para profissionais que buscam conhecimento e networking',
      icon: <Users className="h-7 w-7" />,
      color: 'text-ms-blue-600',
      bgGradient: 'bg-gradient-to-br from-blue-50 via-ms-blue-50 to-blue-100',
      borderGradient: 'bg-gradient-to-r from-ms-blue-500 to-blue-600',
      popular: true,
      badge: 'POPULAR',
      features: [
        'Acesso completo aos 2 dias de evento',
        'Material exclusivo digital do evento',
        'Coffee breaks e almoços inclusos',
        'Certificado digital de participação',
        'Acesso às networking sessions',
        'Gravações das palestras (30 dias)',
        'Acesso ao grupo exclusivo no LinkedIn',
        'Kit de brindes do evento'
      ]
    },
    {
      id: 'premium',
      name: 'Premium VIP',
      price: 599,
      description: 'Experiência completa e exclusiva para líderes e tomadores de decisão',
      icon: <Crown className="h-7 w-7" />,
      color: 'text-purple-600',
      bgGradient: 'bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100',
      borderGradient: 'bg-gradient-to-r from-purple-500 to-violet-600',
      premium: true,
      badge: 'VIP',
      features: [
        'Tudo do plano Standard incluído',
        'Meet & Greet exclusivo com palestrantes',
        'Jantar VIP no primeiro dia',
        'Kit premium personalizado',
        'Sessões privadas de Q&A',
        'Acesso antecipado ao local (30 min)',
        'Vagas garantidas nos workshops',
        'Mentoria 1:1 com MVPs (30 min)',
        'Certificado físico premium',
        'Acesso vitalício às gravações'
      ]
    }
  ];

  const handlePurchase = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    // Simular redirecionamento para gateway de pagamento
    alert(`🎉 Redirecionando para pagamento seguro\n\nPlano: ${plan?.name}\nValor: R$ ${plan?.price}\n\nVocê será redirecionado para nossa plataforma de pagamento segura.`);
  };

  return (
    <section id="tickets" className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-ms-blue-100 to-purple-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-50 to-blue-50 rounded-full opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-ms-blue-100 to-purple-100 rounded-full px-6 py-3 mb-8">
            <Sparkles className="h-5 w-5 text-ms-blue-600" />
            <span className="text-ms-blue-700 font-semibold">Ingressos Disponíveis</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Escolha sua
            <span className="block bg-gradient-to-r from-ms-blue-600 via-purple-600 to-ms-blue-800 bg-clip-text text-transparent">
              Experiência
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Diferentes opções para atender suas necessidades. Todos os ingressos incluem acesso completo 
            ao maior evento de especialistas Microsoft do Brasil.
          </p>
        </div>

        {/* Pricing Cards - Container com padding-top para os badges */}
        <div className="pt-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className={`relative group transition-all duration-500 transform ${
                  hoveredPlan === plan.id ? 'scale-105 z-20' : ''
                } ${
                  plan.popular ? 'lg:scale-105 z-10' : ''
                }`}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Badge - COMPLETAMENTE FORA DO CARD */}
                {(plan.popular || plan.premium || plan.badge) && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
                    <div className={`px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg whitespace-nowrap ${
                      plan.premium ? 'bg-gradient-to-r from-purple-500 to-violet-600' :
                      plan.popular ? 'bg-gradient-to-r from-ms-blue-500 to-blue-600' :
                      'bg-gradient-to-r from-emerald-500 to-green-600'
                    }`}>
                      {plan.badge || (plan.popular ? 'MAIS POPULAR' : 'VIP EXPERIENCE')}
                    </div>
                  </div>
                )}

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${plan.borderGradient} p-1`}></div>
                
                {/* Main card - Altura fixa para todos os cards */}
                <div className={`relative rounded-3xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white ${
                  plan.popular ? 'ring-2 ring-ms-blue-500 ring-opacity-50' : ''
                }`}>
                  
                  {/* Header - Altura fixa com padding-top extra para badges */}
                  <div className={`${plan.bgGradient} px-8 pt-16 pb-8 relative flex-shrink-0`}>
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div className={`p-4 bg-white rounded-2xl shadow-lg ${plan.color} group-hover:scale-110 transition-transform duration-300`}>
                        {plan.icon}
                      </div>
                    </div>
                    
                    {/* Plan name */}
                    <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
                      {plan.name}
                    </h3>
                    
                    {/* Description - Altura mínima para consistência */}
                    <div className="min-h-[3rem] flex items-center justify-center">
                      <p className="text-gray-700 text-center leading-relaxed">
                        {plan.description}
                      </p>
                    </div>
                    
                    {/* Price */}
                    <div className="text-center mt-6">
                      <div className="flex items-center justify-center space-x-3 mb-2">
                        {plan.originalPrice && (
                          <span className="text-2xl text-gray-500 line-through font-medium">
                            R$ {plan.originalPrice}
                          </span>
                        )}
                        <span className="text-5xl md:text-6xl font-bold text-gray-900">
                          R$ {plan.price}
                        </span>
                      </div>
                      <p className="text-gray-600 font-medium">por pessoa</p>
                      {plan.originalPrice && (
                        <div className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2">
                          <Zap className="h-4 w-4" />
                          <span>Economia de R$ {plan.originalPrice - plan.price}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features - Flex grow para ocupar espaço restante */}
                  <div className="bg-white px-8 py-8 flex-grow flex flex-col">
                    {/* Lista de features com altura flexível */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3 group/item">
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                              plan.premium ? 'bg-purple-100' :
                              plan.popular ? 'bg-blue-100' : 'bg-emerald-100'
                            }`}>
                              <Check className={`h-3 w-3 ${
                                plan.premium ? 'text-purple-600' :
                                plan.popular ? 'text-blue-600' : 'text-emerald-600'
                              }`} />
                            </div>
                          </div>
                          <span className="text-gray-700 leading-relaxed group-hover/item:text-gray-900 transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button - Sempre no final */}
                    <button
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        handlePurchase(plan.id);
                      }}
                      className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center space-x-2 mt-auto ${
                        plan.premium
                          ? 'bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white shadow-lg hover:shadow-xl'
                          : plan.popular || selectedPlan === plan.id
                          ? 'bg-gradient-to-r from-ms-blue-600 to-blue-700 hover:from-ms-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      <span>Garantir Ingresso</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
 

        {/* Urgency Banner */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                  <div className="text-white">
                    <p className="text-lg md:text-xl font-bold">⚡ Últimas vagas Early Bird!</p>
                    <p className="text-red-100">Restam apenas <strong>47 ingressos</strong> com desconto especial</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-6 py-3">
                  <Clock className="h-5 w-5 text-white" />
                  <span className="text-white font-semibold">Oferta por tempo limitado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tickets;