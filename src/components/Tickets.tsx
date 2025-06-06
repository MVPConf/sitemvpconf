import React, { useState } from 'react';
import { Check, Star, Users, Gift } from 'lucide-react';

interface TicketPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const Tickets: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');

  const plans: TicketPlan[] = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 299,
      originalPrice: 399,
      icon: <Gift className="h-6 w-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: [
        'Acesso completo aos 2 dias',
        'Material exclusivo do evento',
        'Coffee breaks e almoços',
        'Certificado de participação',
        'Networking sessions',
        'Desconto de 25%'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 399,
      icon: <Users className="h-6 w-6" />,
      color: 'text-ms-blue-600',
      bgColor: 'bg-ms-blue-50',
      popular: true,
      features: [
        'Acesso completo aos 2 dias',
        'Material exclusivo do evento',
        'Coffee breaks e almoços',
        'Certificado de participação',
        'Networking sessions',
        'Gravações das palestras'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 599,
      icon: <Star className="h-6 w-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      features: [
        'Tudo do plano Standard',
        'Meet & Greet com palestrantes',
        'Jantar exclusivo VIP',
        'Kit premium do evento',
        'Sessões privadas de Q&A',
        'Acesso antecipado ao local',
        'Vaga garantida nos workshops'
      ]
    }
  ];

  const handlePurchase = (planId: string) => {
    // Em um cenário real, isso redirecionaria para um gateway de pagamento
    alert(`Redirecionando para pagamento do plano: ${plans.find(p => p.id === planId)?.name}`);
  };

  return (
    <section id="tickets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha seu <span className="gradient-text">Ingresso</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diferentes opções para atender suas necessidades. Todos os ingressos incluem acesso completo ao evento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                plan.popular ? 'ring-2 ring-ms-blue-600' : ''
              } ${
                selectedPlan === plan.id ? 'ring-2 ring-ms-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-ms-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className={`${plan.bgColor} p-8`}>
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 ${plan.color} bg-white rounded-xl`}>
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                  {plan.name}
                </h3>
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    {plan.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">
                        R$ {plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      R$ {plan.price}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">por pessoa</p>
                </div>
              </div>

              <div className="bg-white p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    handlePurchase(plan.id);
                  }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular || selectedPlan === plan.id
                      ? 'bg-ms-blue-600 hover:bg-ms-blue-700 text-white transform hover:scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Comprar Ingresso
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-ms-blue-50 to-ms-blue-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Garantia de Satisfação</h3>
            <p className="text-gray-700">
              Não ficou satisfeito? Oferecemos reembolso total até 30 dias antes do evento. 
              Sua satisfação é nossa prioridade.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pagamento Seguro</h3>
            <p className="text-gray-700">
              Aceitamos cartão de crédito, débito, PIX e boleto bancário. 
              Todos os pagamentos são processados com segurança total.
            </p>
          </div>
        </div>

        {/* Contador de Ingressos */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-red-50 to-red-100 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 font-medium">
              Restam apenas <strong>47 ingressos</strong> Early Bird
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tickets;