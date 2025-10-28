import BuyTickets from './BuyTickets';

const Tickets: React.FC = () => {

  return (
    <section id="tickets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seção removida - evento já passou */}
        {/*
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Garanta seu <span className="gradient-text">ingresso</span> agora
          </h2>
          <BuyTickets title="Compre Agora" />
        </div>

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
        */}

        {/* Mensagem informativa sobre o evento */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MVP Conf 2025
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Obrigado por participar do maior evento de especialistas Microsoft do Brasil!
          </p>
          <div className="bg-gradient-to-br from-ms-blue-50 to-ms-blue-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Evento Realizado com Sucesso</h3>
            <p className="text-gray-700 text-lg">
              O MVP Conf 2025 foi um sucesso! Agradecemos a todos os participantes, palestrantes e patrocinadores
              que fizeram parte desta jornada incrível de conhecimento e networking.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Tickets;
