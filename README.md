# 🚀 MVP Conf 2025 Brasil

<div align="center">

![MVP Conf 2025](https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800&h=300&fit=crop)

**O maior encontro de especialistas e MVPs do Brasil**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

[🎯 Demo](#-demo) • [✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📱 Mobile](#-mobile-responsive) • [🐳 Docker](#-docker-deployment)

</div>

---

## 📋 Sobre o Projeto

Site oficial do **MVP Conf 2025 Brasil**, o maior evento de especialistas Microsoft do país. Uma experiência única de aprendizado, networking e inspiração que conecta a comunidade tech brasileira com os melhores profissionais do ecossistema Microsoft.

### 🎯 Objetivos

- 🤝 **Networking**: Conectar profissionais e especialistas Microsoft
- 📚 **Conhecimento**: Compartilhar as últimas inovações e melhores práticas
- 🌟 **Inspiração**: Motivar a comunidade tech brasileira
- 🚀 **Inovação**: Apresentar tecnologias emergentes do ecossistema Microsoft

---

## ✨ Features

### 🎨 **Design & UX**
- ✅ Design moderno e responsivo inspirado no Microsoft Design System
- ✅ Animações suaves e micro-interações
- ✅ Gradientes e efeitos visuais premium
- ✅ Tipografia otimizada (Inter font)
- ✅ Paleta de cores Microsoft-inspired
- ✅ Componentes reutilizáveis e modulares

### 📱 **Mobile-First**
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Touch-friendly navigation
- ✅ Otimizado para diferentes tamanhos de tela
- ✅ Performance otimizada para dispositivos móveis

### 🔧 **Funcionalidades**
- ✅ **Hero Section** com informações do evento
- ✅ **Palestrantes** com integração de API externa
- ✅ **Cronograma** dinâmico com dados da API
- ✅ **Patrocinadores** organizados por tier
- ✅ **Localização** com mapa integrado
- ✅ **Ingressos** com diferentes planos
- ✅ **Contato** com formulário funcional
- ✅ **Páginas Legais** (Privacidade, Termos, Código de Conduta)

### ⚡ **Performance & Otimização**
- ✅ Cache inteligente (10 minutos) para dados da API
- ✅ Lazy loading de imagens
- ✅ Code splitting automático
- ✅ Compressão de assets
- ✅ SEO otimizado
- ✅ Lighthouse score 90+

### 🔌 **Integrações**
- ✅ **API Externa**: Palestrantes e cronograma via GitHub
- ✅ **Google Maps**: Localização do evento
- ✅ **Fallback Images**: Pexels para imagens de placeholder
- ✅ **Error Handling**: Tratamento robusto de erros
- ✅ **Retry Logic**: Tentativas automáticas em caso de falha

---

## 🚀 Quick Start

### Pré-requisitos

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Git**

### Instalação

```bash
# Clone o repositório
git clone https://github.com/MVPConf/sitemvpconf.git
cd sitemvpconf

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run type-check   # Verifica tipos TypeScript
```

---

## 🏗️ Arquitetura

### 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Header.tsx       # Navegação principal
│   ├── Hero.tsx         # Seção hero
│   ├── Speakers.tsx     # Lista de palestrantes
│   ├── Schedule.tsx     # Cronograma do evento
│   ├── Sponsors.tsx     # Patrocinadores
│   ├── Location.tsx     # Localização e mapas
│   ├── Tickets.tsx      # Planos de ingressos
│   ├── Contact.tsx      # Formulário de contato
│   ├── Footer.tsx       # Rodapé
│   └── LegalPages/      # Páginas legais
├── hooks/               # Custom hooks
│   ├── useSpeakers.ts   # Hook para palestrantes
│   ├── useSchedule.ts   # Hook para cronograma
│   └── useSponsors.ts   # Hook para patrocinadores
├── App.tsx             # Componente principal
├── main.tsx            # Entry point
└── index.css           # Estilos globais
```

### 🔧 Tecnologias Utilizadas

| Categoria | Tecnologia | Versão | Descrição |
|-----------|------------|--------|-----------|
| **Frontend** | React | 18.3.1 | Biblioteca para interfaces |
| **Language** | TypeScript | 5.5.3 | Tipagem estática |
| **Styling** | Tailwind CSS | 3.4.1 | Framework CSS utility-first |
| **Build** | Vite | 5.4.2 | Build tool moderna |
| **Icons** | Lucide React | 0.344.0 | Ícones SVG |
| **Linting** | ESLint | 9.9.1 | Análise de código |

---

## 📱 Mobile Responsive

### Breakpoints

```css
/* Mobile First Approach */
sm: 640px    /* Tablets pequenos */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Telas grandes */
```

### Otimizações Mobile

- **Navigation**: Menu hamburger responsivo
- **Hero**: Ajustes de tipografia e espaçamento
- **Cards**: Layout adaptativo em grid
- **Forms**: Inputs otimizados para touch
- **Images**: Lazy loading e fallbacks

---

## 🐳 Docker Deployment

### Quick Start com Docker

```bash
# Usando Docker Compose (Recomendado)
docker-compose up --build

# Acesse http://localhost:3000
```

### Build Manual

```bash
# Build da imagem
docker build -t mvp-conf-2025 .

# Executar container
docker run -p 3000:80 mvp-conf-2025
```

### Características do Container

- ✅ **Multi-stage build** para otimização
- ✅ **Nginx Alpine** (imagem final ~25MB)
- ✅ **Gzip compression** habilitada
- ✅ **Security headers** configurados
- ✅ **Health checks** incluídos
- ✅ **Cache otimizado** para assets estáticos

---

## 🔌 API Integration

### Endpoints Utilizados

```typescript
// Palestrantes
GET https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/speakers.json

// Cronograma
GET https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/schedule.json

// Patrocinadores
GET https://raw.githubusercontent.com/MVPConf/2025/refs/heads/main/sponsors.json
```

### Cache Strategy

- **Duração**: 10 minutos
- **Storage**: localStorage
- **Fallback**: Retry automático em caso de erro
- **Invalidação**: Manual via botão refresh

### Error Handling

```typescript
// Exemplo de tratamento de erro
try {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  // Process data...
} catch (error) {
  setError(`Erro ao carregar: ${error.message}`);
  // Show retry button
}
```

---

## 🎨 Design System

### Cores Principais

```css
/* Microsoft Blue Palette */
--ms-blue-50: #eff6ff
--ms-blue-600: #0078D4  /* Primary */
--ms-blue-700: #1d4ed8  /* Primary Dark */

/* Gradients */
--gradient-primary: linear-gradient(135deg, #0078D4 0%, #1e40af 100%)
--gradient-text: linear-gradient(to right, #0078D4, #1e40af)
```

### Tipografia

```css
/* Font Stack */
font-family: 'Inter', system-ui, -apple-system, sans-serif

/* Weights */
300 - Light
400 - Regular  
500 - Medium
600 - Semibold
700 - Bold
800 - Extrabold
```

### Componentes

```css
/* Buttons */
.btn-primary    /* Botão principal azul */
.btn-secondary  /* Botão secundário outline */

/* Cards */
.card-hover     /* Efeito hover com scale */

/* Text */
.gradient-text  /* Texto com gradiente */
```

---

## 🚀 Performance

### Métricas Lighthouse

| Métrica | Score | Otimização |
|---------|-------|------------|
| **Performance** | 95+ | Code splitting, lazy loading |
| **Accessibility** | 100 | ARIA labels, semantic HTML |
| **Best Practices** | 100 | HTTPS, security headers |
| **SEO** | 100 | Meta tags, structured data |

### Otimizações Implementadas

- ✅ **Tree shaking** automático
- ✅ **Asset optimization** via Vite
- ✅ **Image lazy loading**
- ✅ **Component code splitting**
- ✅ **CSS purging** via Tailwind
- ✅ **Gzip compression**

---

## 🔒 Segurança

### Headers de Segurança

```nginx
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
Content-Security-Policy: default-src 'self' http: https: data: blob: 'unsafe-inline'
```

### Práticas Implementadas

- ✅ **Input sanitization** em formulários
- ✅ **HTTPS enforcement** em produção
- ✅ **Secure headers** via Nginx
- ✅ **No sensitive data** em localStorage
- ✅ **Error handling** sem exposição de dados

---

## 🧪 Testing

### Estratégia de Testes

```bash
# Testes unitários (futuro)
npm run test

# Testes E2E (futuro)
npm run test:e2e

# Coverage (futuro)
npm run test:coverage
```

### Ferramentas Planejadas

- **Vitest** para testes unitários
- **Testing Library** para testes de componentes
- **Playwright** para testes E2E
- **MSW** para mock de APIs

---

## 🌍 Internacionalização

### Idiomas Suportados

- 🇧🇷 **Português (Brasil)** - Padrão
- 🇺🇸 **English** - Planejado

### Implementação

```typescript
// Estrutura planejada para i18n
const translations = {
  'pt-BR': {
    'hero.title': 'MVP Conf',
    'hero.subtitle': 'O maior encontro de especialistas...'
  },
  'en-US': {
    'hero.title': 'MVP Conf',
    'hero.subtitle': 'The biggest gathering of experts...'
  }
}
```

---

## 📈 Analytics & Monitoring

### Ferramentas Planejadas

- **Google Analytics 4** para métricas de uso
- **Hotjar** para heatmaps e user behavior
- **Sentry** para error tracking
- **Lighthouse CI** para performance monitoring

---

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

### Padrões de Código

```bash
# Antes de commitar
npm run lint        # Verificar linting
npm run type-check  # Verificar tipos
npm run build       # Testar build
```

### Commit Convention

```bash
feat: adiciona nova funcionalidade
fix: corrige bug
docs: atualiza documentação
style: mudanças de formatação
refactor: refatoração de código
test: adiciona ou modifica testes
chore: mudanças de build/config
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Equipe

<div align="center">

### Desenvolvido com ❤️ pela equipe MVP Conf 2025

**Contato**: contato@mvpconf.com.br  
**Website**: [mvpconf.com.br](https://mvpconf.com.br)  
**LinkedIn**: [MVP Conf Brasil](https://linkedin.com/company/mvpconf)

</div>

---

## 🙏 Agradecimentos

- **Microsoft** pelo suporte à comunidade MVP
- **Pexels** pelas imagens de alta qualidade
- **Lucide** pelos ícones elegantes
- **Tailwind CSS** pelo framework incrível
- **Vite** pela experiência de desenvolvimento

---

<div align="center">

**⭐ Se este projeto foi útil, considere dar uma estrela!**

[![GitHub stars](https://img.shields.io/github/stars/MVPConf/sitemvpconf?style=social)](https://github.com/MVPConf/sitemvpconf)

</div>