import React from 'react';
import { Heart, Users, Shield, AlertCircle, Phone, ArrowLeft } from 'lucide-react';

interface CodeOfConductProps {
  onBack: () => void;
}

const CodeOfConduct: React.FC<CodeOfConductProps> = ({ onBack }) => {
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
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Código de <span className="gradient-text">Conduta</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Criando um ambiente seguro, inclusivo e respeitoso para todos os participantes
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Versão 2.0 - Janeiro de 2025
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            
            {/* Introdução */}
            <div className="mb-12">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  O MVP Conf 2025 Brasil é dedicado a fornecer uma experiência livre de assédio 
                  para todos, independentemente de gênero, identidade e expressão de gênero, 
                  orientação sexual, deficiência, aparência física, tamanho corporal, raça, 
                  idade, religião ou nacionalidade.
                </p>
              </div>
            </div>

            {/* Seção 1 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Comportamento Esperado</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Todos os participantes, palestrantes, patrocinadores e voluntários devem:</p>
                <ul className="list-disc pl-6 space-y-3">
                  <li>
                    <strong>Ser respeitoso:</strong> Tratar todos com cortesia, respeito e profissionalismo
                  </li>
                  <li>
                    <strong>Ser inclusivo:</strong> Usar linguagem acolhedora e inclusiva
                  </li>
                  <li>
                    <strong>Ser colaborativo:</strong> Focar no que é melhor para a comunidade
                  </li>
                  <li>
                    <strong>Ser empático:</strong> Tentar entender diferentes perspectivas
                  </li>
                  <li>
                    <strong>Ser construtivo:</strong> Oferecer feedback de forma construtiva
                  </li>
                  <li>
                    <strong>Respeitar limites:</strong> Aceitar quando alguém declina interação
                  </li>
                </ul>
              </div>
            </div>

            {/* Seção 2 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Comportamento Inaceitável</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Os seguintes comportamentos são considerados inaceitáveis:</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.1 Assédio e Discriminação</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comentários ofensivos relacionados a gênero, orientação sexual, raça, religião, deficiência</li>
                  <li>Uso de linguagem ou imagens sexualizadas</li>
                  <li>Intimidação deliberada, perseguição ou stalking</li>
                  <li>Contato físico inapropriado</li>
                  <li>Atenção sexual indesejada</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.2 Comportamento Disruptivo</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Interrupção sustentada de palestras ou eventos</li>
                  <li>Uso excessivo de álcool ou substâncias</li>
                  <li>Comportamento agressivo ou ameaçador</li>
                  <li>Spam ou autopromoção excessiva</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">2.3 Violação de Propriedade</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gravação não autorizada de apresentações</li>
                  <li>Compartilhamento de material protegido por direitos autorais</li>
                  <li>Uso indevido de informações confidenciais</li>
                </ul>
              </div>
            </div>

            {/* Seção 3 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Diretrizes Específicas</h2>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">3.1 Comunicação</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Use linguagem inclusiva e profissional</li>
                    <li>Evite jargões que possam excluir iniciantes</li>
                    <li>Seja paciente com perguntas e diferentes níveis de conhecimento</li>
                    <li>Critique ideias, não pessoas</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">3.2 Networking</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Respeite o espaço pessoal dos outros</li>
                    <li>Aceite "não" como resposta</li>
                    <li>Inclua outros em conversas quando apropriado</li>
                    <li>Evite monopolizar o tempo de palestrantes</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">3.3 Redes Sociais</h3>
                  <ul className="list-disc pl-6 space-y-2 mt-2">
                    <li>Peça permissão antes de marcar pessoas em fotos</li>
                    <li>Respeite pedidos de não fotografar</li>
                    <li>Use hashtags oficiais responsavelmente</li>
                    <li>Não compartilhe informações pessoais de outros</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Seção 4 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Processo de Denúncia</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Se você presenciar ou sofrer comportamento inaceitável:</p>
                
                <h3 className="text-lg font-semibold text-gray-900">4.1 Canais de Denúncia</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Procure qualquer membro da equipe organizadora</li>
                  <li>Envie e-mail para: <strong>conduta@mvpconf.com.br</strong></li>
                  <li>Use o formulário anônimo no site do evento</li>
                  <li>Ligue para nossa linha direta: <strong>(11) 99999-0000</strong></li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">4.2 Informações a Incluir</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Descrição detalhada do incidente</li>
                  <li>Data, hora e local</li>
                  <li>Pessoas envolvidas (se conhecido)</li>
                  <li>Testemunhas (se houver)</li>
                  <li>Qualquer evidência (fotos, mensagens, etc.)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">4.3 Garantias</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Todas as denúncias serão tratadas com seriedade</li>
                  <li>Confidencialidade será mantida quando possível</li>
                  <li>Não haverá retaliação contra denunciantes</li>
                  <li>Investigação será conduzida de forma imparcial</li>
                </ul>
              </div>
            </div>

            {/* Seção 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Consequências</h2>
              <div className="space-y-4 text-gray-700">
                <p>Violações deste código podem resultar em:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Advertência verbal:</strong> Para infrações menores</li>
                  <li><strong>Advertência formal:</strong> Documentada e comunicada por escrito</li>
                  <li><strong>Suspensão temporária:</strong> Remoção de atividades específicas</li>
                  <li><strong>Expulsão:</strong> Remoção imediata do evento sem reembolso</li>
                  <li><strong>Banimento:</strong> Proibição de participar de eventos futuros</li>
                </ul>
                
                <p className="mt-4">
                  A severidade da consequência dependerá da natureza e gravidade da violação, 
                  histórico do participante e impacto na comunidade.
                </p>
              </div>
            </div>

            {/* Seção 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Escopo</h2>
              <div className="space-y-4 text-gray-700">
                <p>Este código de conduta se aplica a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Todos os espaços do evento (salas, corredores, áreas de alimentação)</li>
                  <li>Eventos sociais oficiais</li>
                  <li>Comunicações online relacionadas ao evento</li>
                  <li>Redes sociais quando usando hashtags do evento</li>
                  <li>Interações entre participantes fora do evento, se afetarem a comunidade</li>
                </ul>
              </div>
            </div>

            {/* Seção 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Recursos e Apoio</h2>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">7.1 Equipe de Apoio</h3>
                <p>Nossa equipe treinada está disponível para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Receber e investigar denúncias</li>
                  <li>Fornecer apoio emocional</li>
                  <li>Conectar com recursos externos se necessário</li>
                  <li>Acompanhar participantes que sofreram incidentes</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">7.2 Recursos Externos</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Central de Atendimento à Mulher: 180</li>
                  <li>Disque Direitos Humanos: 100</li>
                  <li>Polícia Militar: 190</li>
                  <li>SAMU: 192</li>
                </ul>
              </div>
            </div>

            {/* Contato de Emergência */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-600 rounded-lg">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-red-800">Contatos de Emergência</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700">
                <div>
                  <p><strong>Equipe de Conduta:</strong></p>
                  <p>📧 conduta@mvpconf.com.br</p>
                  <p>📱 (11) 99999-0000</p>
                </div>
                <div>
                  <p><strong>Segurança do Local:</strong></p>
                  <p>📱 (11) 99999-0001</p>
                  <p>🏢 Balcão de informações</p>
                </div>
              </div>
            </div>

            {/* Agradecimento */}
            <div className="bg-ms-blue-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Agradecimento</h2>
              <p className="text-gray-700">
                Este código de conduta é baseado nas melhores práticas da comunidade tech 
                e foi adaptado do Contributor Covenant e códigos de conduta de eventos 
                similares. Agradecemos a todos que contribuíram para criar um ambiente 
                mais seguro e inclusivo.
              </p>
              <p className="text-gray-700 mt-4">
                <strong>Juntos, construímos uma comunidade melhor! 🚀</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;