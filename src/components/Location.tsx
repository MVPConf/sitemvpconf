import React from 'react';
import { MapPin, Car, Plane, Train, Clock } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-gradient-to-br from-ms-light-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="gradient-text">Localização</span> do Evento
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O MVP Conf 2025 acontecerá no coração de São Paulo, em um local de fácil acesso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Mapa */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-ms-blue-100 to-ms-blue-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6564!3d-23.5618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt!2sbr!4v1635959876543!5m2!1spt!2sbr"
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

          {/* Informações do Local */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-ms-blue-600 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Centro de Convenções Faria Lima</h3>
                  <p className="text-gray-600">
                    Av. Brigadeiro Faria Lima, 2232<br />
                    Jardim Paulistano, São Paulo - SP<br />
                    CEP: 01451-905
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Horários do Evento</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-ms-blue-600" />
                    <span className="text-gray-700">
                      <strong>Dia 15/03:</strong> 08:00 - 18:00
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-ms-blue-600" />
                    <span className="text-gray-700">
                      <strong>Dia 16/03:</strong> 08:00 - 17:00
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Como Chegar */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Como Chegar</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Train className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Metrô</h4>
                    <p className="text-gray-600 text-sm">Linha 4-Amarela - Estação Faria Lima (5 min caminhada)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Carro</h4>
                    <p className="text-gray-600 text-sm">Estacionamento no local (R$ 15/dia)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Plane className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Aeroporto</h4>
                    <p className="text-gray-600 text-sm">40 min de Congonhas, 60 min de Guarulhos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotéis Próximos */}
            <div className="bg-gradient-to-br from-ms-blue-50 to-ms-blue-100 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Hotéis Recomendados</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Hotel Faria Lima Premium</span>
                  <span className="text-ms-blue-600 font-medium">2 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Comfort Suites Berrini</span>
                  <span className="text-ms-blue-600 font-medium">8 min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Hilton São Paulo Morumbi</span>
                  <span className="text-ms-blue-600 font-medium">12 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;