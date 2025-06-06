import React from 'react';
import { Shield, Eye, Lock, Database, Mail, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Política de <span className="gradient-text">Privacidade</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sua privacidade é fundamental para nós. Saiba como coletamos, usamos e protegemos seus dados.
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
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Informações que Coletamos</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-900">1.1 Informações Pessoais</h3>
                <p>Coletamos as seguintes informações quando você se registra para o MVP Conf 2025:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Telefone (opcional)</li>
                  <li>Empresa/organização</li>
                  <li>Cargo/função</li>
                  <li>Informações de pagamento (processadas por terceiros seguros)</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">1.2 Informações Técnicas</h3>
                <p>Automaticamente coletamos:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e versão</li>
                  <li>Sistema operacional</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Cookies e tecnologias similares</li>
                </ul>
              </div>
            </div>

            {/* Seção 2 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Database className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Como Usamos suas Informações</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processar sua inscrição e pagamento</li>
                  <li>Enviar confirmações e atualizações sobre o evento</li>
                  <li>Fornecer suporte ao participante</li>
                  <li>Melhorar nossos serviços e experiência do usuário</li>
                  <li>Enviar comunicações de marketing (com seu consentimento)</li>
                  <li>Cumprir obrigações legais</li>
                  <li>Gerar estatísticas anônimas sobre o evento</li>
                </ul>
              </div>
            </div>

            {/* Seção 3 */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Lock className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Proteção de Dados</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criptografia SSL/TLS para transmissão de dados</li>
                  <li>Armazenamento seguro em servidores protegidos</li>
                  <li>Acesso restrito apenas a pessoal autorizado</li>
                  <li>Monitoramento contínuo de segurança</li>
                  <li>Backups regulares e seguros</li>
                  <li>Políticas internas de proteção de dados</li>
                </ul>
              </div>
            </div>

            {/* Seção 4 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Compartilhamento de Informações</h2>
              <div className="space-y-4 text-gray-700">
                <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais, exceto:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Com prestadores de serviços confiáveis (processamento de pagamentos, e-mail marketing)</li>
                  <li>Quando exigido por lei ou autoridades competentes</li>
                  <li>Para proteger nossos direitos legais</li>
                  <li>Com seu consentimento explícito</li>
                </ul>
              </div>
            </div>

            {/* Seção 5 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Seus Direitos</h2>
              <div className="space-y-4 text-gray-700">
                <p>Você tem o direito de:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir dados incorretos ou incompletos</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimentos dados anteriormente</li>
                  <li>Portabilidade de dados</li>
                  <li>Opor-se ao processamento de seus dados</li>
                </ul>
                <p className="mt-4">
                  Para exercer esses direitos, entre em contato conosco através do e-mail: 
                  <strong> privacidade@mvpconf.com.br</strong>
                </p>
              </div>
            </div>

            {/* Seção 6 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>Utilizamos cookies para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Manter você logado durante a sessão</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar o tráfego do site</li>
                  <li>Personalizar conteúdo</li>
                </ul>
                <p>Você pode gerenciar cookies através das configurações do seu navegador.</p>
              </div>
            </div>

            {/* Seção 7 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Retenção de Dados</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
                  os propósitos descritos nesta política, salvo quando um período de retenção 
                  mais longo for exigido por lei.
                </p>
                <p>
                  Dados de participantes são mantidos por até 5 anos após o evento para 
                  fins de comunicação sobre eventos futuros e obrigações legais.
                </p>
              </div>
            </div>

            {/* Seção 8 */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Alterações nesta Política</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. 
                  Notificaremos sobre mudanças significativas através do e-mail 
                  ou aviso em nosso site.
                </p>
              </div>
            </div>

            {/* Contato */}
            <div className="bg-ms-blue-50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-ms-blue-600 rounded-lg">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Contato</h2>
              </div>
              <p className="text-gray-700">
                Para dúvidas sobre esta Política de Privacidade ou exercer seus direitos, 
                entre em contato:
              </p>
              <div className="mt-4 space-y-2">
                <p><strong>E-mail:</strong> privacidade@mvpconf.com.br</p>
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

export default PrivacyPolicy;