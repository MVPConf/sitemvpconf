import React from 'react';
import { MapPin, Car, Hotel, Train, Clock, Navigation, Building2 } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-white relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ms-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Localização</span> do Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O MVP Conf 2025 acontecerá no coração de São Paulo, em um local de fácil acesso
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-ms-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Card principal com endereço e mapa */}
        <div className="bg-gradient-to-br from-ms-blue-600 to-cyan-600 rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Informações principais */}
            <div className="p-8 md:p-12 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Building2 className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold">UNIP Campus</h3>
                  <p className="text-blue-100">Paraíso/Vergueiro</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Rua Vergueiro, 1211</p>
                    <p className="text-blue-100">Paraíso, São Paulo/SP</p>
                    <p className="text-blue-100">CEP: 01504-000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Horários</p>
                    <p className="text-blue-100">Dia 24/10: 09:00 - 18:00</p>
                    <p className="text-blue-100">Dia 25/10: 09:00 - 18:00</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/place/UNIP+-+Para%C3%ADso%2FVergueiro/@-23.5727459,-46.6421617,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ms-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105"
              >
                <Navigation className="h-5 w-5" />
                Abrir no Google Maps
              </a>
            </div>

            {/* Mapa */}
            <div className="relative h-[400px] lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.8801966183287!2d-46.64216172365544!3d-23.5727458787919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5999978b48df%3A0xceb9c9263e11fa9e!2sUNIP%20-%20Para%C3%ADso%2FVergueiro!5e0!3m2!1sen!2sbr!4v1749242947469!5m2!1sen!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Grid de informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Como Chegar */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-xl">
                <Train className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Transporte</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Metrô</h4>
                <p className="text-gray-600 text-sm">• Estação Paraíso (Linha Azul)</p>
                <p className="text-gray-600 text-sm">• Estação Vergueiro (Linha Azul)</p>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-start gap-2">
                  <Car className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Carro</h4>
                    <p className="text-gray-600 text-sm">Estacionamento disponível no local</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pontos de Referência */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-xl">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Proximidades</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Avenida Paulista
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Avenida 23 de Maio
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Centro Cultural SP
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Hospital AC Camargo
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                Hospital Oswaldo Cruz
              </p>
            </div>
          </div>

          {/* Hotéis */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-cyan-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-100 rounded-xl">
                <Hotel className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Hospedagem</h3>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                Angatu Hostel (2.4km)
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                Pullman SP Ibirapuera (2.4km)
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                Transamerica Nova Paulista (2.5km)
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                Slaviero SP Moema (2.5km)
              </p>
              <p className="text-gray-600 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                Ibis SP Congonhas (2.6km)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
