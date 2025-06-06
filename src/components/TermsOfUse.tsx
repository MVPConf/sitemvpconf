import React from 'react';
import { FileText, AlertTriangle, CreditCard, Users, ArrowLeft } from 'lucide-react';

interface TermsOfUseProps {
  onBack: () => void;
}

const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ms-light-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-ms-blue-600 hover:text-ms-blue-700 transition-colors mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Voltar</span>
          </button>
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-ms-blue-600 rounded-2xl">
                <FileText className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Termos de <span className="gradient-text">Uso</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Condições gerais para participação no MVP Conf 2025 Brasil
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Última atualização: Janeiro de 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Seção 1 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Aceitação dos Termos</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Ao se inscrever e participar do Microsoft MVP Conf 2025 Brasil ("Evento"), 
                  você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concorda com qualquer parte destes termos, não deve participar do evento.
                </p>
                <p>
                  Estes termos constituem um acordo legal entre você e os organizadores do MVP Conf 2025.
                </p>
              </div>
            </div>

            {/* Seção 2 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Inscrição e Elegibilidade</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">2.1 Requisitos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Você deve ter pelo menos 18 anos de idade</li>
                  <li>Fornecer informações precisas e completas durante a inscrição</li>
                  <li>Manter suas informações atualizadas</li>
                  <li>Ter autorização para aceitar estes termos em nome de sua empresa (se aplicável)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.2 Processo de Inscrição</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A inscrição só é válida após confirmação de pagamento</li>
                  <li>Vagas limitadas, sujeitas à disponibilidade</li>
                  <li>Reservamo-nos o direito de recusar inscrições</li>
                  <li>Confirmação será enviada por e-mail</li>
                </ul>
              </div>
            </div>

            {/* Seção 3 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CreditCard className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Pagamento e Reembolso</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">3.1 Pagamento</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pagamento deve ser feito no ato da inscrição</li>
                  <li>Preços em reais brasileiros (BRL)</li>
                  <li>Aceitamos cartão de crédito, débito, PIX e boleto</li>
                  <li>Preços sujeitos a alteração sem aviso prévio</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">3.2 Política de Reembolso</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Até 30 dias antes:</strong> Reembolso integral (100%)</li>
                  <li><strong>15-29 dias antes:</strong> Reembolso de 75%</li>
                  <li><strong>7-14 dias antes:</strong> Reembolso de 50%</li>
                  <li><strong>Menos de 7 dias:</strong> Sem reembolso</li>
                  <li>Processamento em até 10 dias úteis</li>
                </ul>
              </div>
            </div>

            {/* Seção 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Conduta do Participante</h2>
              <div className="space-y-4 text-gray-700">
                <p>Todos os participantes devem:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Seguir o Código de Conduta do evento</li>
                  <li>Tratar todos com respeito e profissionalismo</li>
                  <li>Não perturbar apresentações ou atividades</li>
                  <li>Não usar linguagem ofensiva ou discriminatória</li>
                  <li>Respeitar a propriedade intelectual de palestrantes</li>
                  <li>Não fazer gravações não autorizadas</li>
                </ul>
              </div>
            </div>

            {/* Seção 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Propriedade Intelectual</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">5.1 Conteúdo do Evento</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Todo conteúdo apresentado é propriedade dos respectivos palestrantes</li>
                  <li>Materiais fornecidos são apenas para uso pessoal</li>
                  <li>Proibida reprodução ou distribuição sem autorização</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">5.2 Gravações</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Organizadores podem gravar sessões para distribuição posterior</li>
                  <li>Participantes não podem gravar sem autorização expressa</li>
                  <li>Fotos e vídeos podem ser usados para divulgação do evento</li>
                </ul>
              </div>
            </div>

            {/* Seção 6 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. Limitação de Responsabilidade</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Os organizadores não se responsabilizam por:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Danos pessoais ou perda de propriedade</li>
                  <li>Cancelamento devido a circunstâncias imprevistas</li>
                  <li>Alterações na programação ou palestrantes</li>
                  <li>Problemas técnicos ou de conectividade</li>
                  <li>Despesas de viagem e hospedagem</li>
                </ul>
                <p className="mt-4">
                  Recomendamos contratar seguro de viagem e verificar políticas de cancelamento 
                  de hotéis e passagens.
                </p>
              </div>
            </div>

            {/* Seção 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Cancelamento do Evento</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Em caso de cancelamento do evento por motivos de força maior 
                  (pandemia, desastres naturais, etc.), ofereceremos:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Transferência para nova data, ou</li>
                  <li>Crédito para eventos futuros, ou</li>
                  <li>Reembolso parcial (descontadas despesas já incorridas)</li>
                </ul>
              </div>
            </div>

            {/* Seção 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Privacidade e Dados</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  O tratamento de dados pessoais segue nossa Política de Privacidade. 
                  Ao participar, você consente com:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Coleta e uso de dados para organização do evento</li>
                  <li>Comunicações relacionadas ao evento</li>
                  <li>Uso de imagem para divulgação (salvo oposição expressa)</li>
                </ul>
              </div>
            </div>

            {/* Seção 9 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Alterações nos Termos</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                  Alterações significativas serão comunicadas por e-mail com pelo menos 
                  15 dias de antecedência.
                </p>
              </div>
            </div>

            {/* Seção 10 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Lei Aplicável</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Estes termos são regidos pelas leis brasileiras. 
                  Qualquer disputa será resolvida no foro da comarca de São Paulo, SP.
                </p>
              </div>
            </div>

            {/* Contato */}
            <div className="bg-ms-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contato</h2>
              <p className="text-gray-700 mb-4">
                Para dúvidas sobre estes Termos de Uso:
              </p>
              <div className="space-y-2">
                <p><strong>E-mail:</strong> legal@mvpconf.com.br</p>
                <p><strong>Telefone:</strong> (11) 3456-7890</p>
                <p><strong>Endereço:</strong> Av. Paulista, 1578 - 5º andar, São Paulo - SP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;