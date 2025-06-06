import React from 'react';
import { MapPin, Car, Hotel, Train, Clock } from 'lucide-react';

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

          {/* Informações do Local */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-ms-blue-600 rounded-xl">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">UNIP Campus Paraíso/Vergueiro</h3>
                  <p className="text-gray-600">
                    Rua Vergueiro, 1211<br />
                    Paraíso, São Paulo/SP<br />
                    CEP: 01504-000
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Horários do Evento</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-ms-blue-600" />
                    <span className="text-gray-700">
                      <strong>Dia 24/10:</strong> 09:00 - 18:00
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-ms-blue-600" />
                    <span className="text-gray-700">
                      <strong>Dia 25/10:</strong> 09:00 - 18:00
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
                    <p className="text-gray-600 text-sm">Estação Paraíso – Linha Azul</p>
                    <p className="text-gray-600 text-sm">Estação Vergueiro – Linha Azul</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Car className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Carro</h4>
                    <p className="text-gray-600 text-sm">Estacionamento no local</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pontos de Referência</h4>
                    <p className="text-gray-600 text-sm">Avenida Paulista</p>
                    <p className="text-gray-600 text-sm">Avenida 23 de Maio  </p>
                    <p className="text-gray-600 text-sm">Centro Cultural de São Paulo  </p> 
                    <p className="text-gray-600 text-sm">Centro de Controle do Metrô </p> 
                    <p className="text-gray-600 text-sm">Hospital AC Camargo</p>   
                    <p className="text-gray-600 text-sm">Hospital Oswaldo Cruz</p> 
                  </div>
                </div>               
              </div>
            </div>

            {/* Hotéis */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Hotéis Recomendados</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Hotel className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Angatu Hostel - 2.4km</p>
                    <p className="text-gray-600 text-sm">Pullman São Paulo Ibirapuera - 2.4km</p>
                    <p className="text-gray-600 text-sm">Transamerica Executive Nova Paulista - 2.5 km</p> 
                    <p className="text-gray-600 text-sm">Slaviero São Paulo Moema - 2.5 km</p> 
                    <p className="text-gray-600 text-sm">Ibis SP Congonhas - 2.6 km</p>   
                  </div>
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