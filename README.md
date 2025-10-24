# MVPConf - Site Oficial

Site oficial do evento MVPConf, desenvolvido com React + TypeScript + Vite + Tailwind CSS.

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## 🚀 Como executar o projeto

### App Principal (Site MVPConf)

Execute o site principal em modo de desenvolvimento:

```bash
cd c:\Proj\MVPConf\sitemvpconf
npm install
npm run dev
```

O site estará disponível em: `http://localhost:5173`

### 📅 App de Agenda

A agenda é uma aplicação standalone localizada em `public/agenda`. Para executá-la:

```bash
cd c:\Proj\MVPConf\sitemvpconf\public\agenda
npx http-server -p 8080 -o
```

A agenda estará disponível em: `http://localhost:8080`

> **Nota:** O comando `npx http-server -p 8080 -o` inicia um servidor HTTP na porta 8080 e abre automaticamente o navegador.

#### ⚙️ Configuração de Fonte de Dados

O app de agenda pode carregar dados de duas fontes diferentes. Para alternar entre elas, edite o arquivo `public/agenda/app.js`:

```javascript
// No início do arquivo app.js (linha ~10)
const USE_LOCAL_JSON = true;  // true = JSON local | false = API Excel
```

**Opções:**
- `true` - Carrega do arquivo `Palestras.json` (desenvolvimento/testes)
- `false` - Carrega da API Power Automate conectada ao Excel (produção)

Essa configuração permite trabalhar offline ou testar com dados locais sem depender da API externa.

## 🛠️ Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter

## 📁 Estrutura do projeto

```
sitemvpconf/
├── public/
│   ├── agenda/           # App standalone de agenda
│   │   ├── index.html
│   │   ├── app.js
│   │   ├── styles.css
│   │   └── data.js
│   └── images/
├── src/
│   ├── components/       # Componentes React
│   ├── hooks/           # Custom hooks
│   └── main.tsx         # Entry point
├── package.json
└── vite.config.ts
```

## 🎨 Tecnologias utilizadas

### App Principal
- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **Tailwind CSS v4** - Framework CSS
- **PostCSS** - Processamento CSS

### App de Agenda
- **Vanilla JavaScript** (ES6 Modules)
- **CSS Custom Properties**
- **Service Worker** (PWA)
- **Local Storage** para persistência

## 🎯 Features da Agenda

- ✅ Seleção de palestras por horário
- ✅ Filtros por trilha e busca por palavra-chave
- ✅ Badges coloridos por trilha (Developer, Azure, M365, Data Platform, etc.)
- ✅ Indicação de nível (Iniciante, Intermediário, Avançado)
- ✅ Resumo visual da agenda selecionada
- ✅ Salvamento e carregamento via API
- ✅ Interface responsiva
- ✅ Modo offline (Service Worker)

## 🎨 Trilhas disponíveis

A agenda suporta as seguintes trilhas com cores específicas:

- **Auditorio** - Vermelho
- **Business Application** - Rosa
- **Cloud & Datacenter Management** - Azul claro
- **Data Platform** - Roxo
- **Developer Technologies** - Azul
- **Gestão de Negócios e Empreendedorismo** - Laranja
- **Inteligência Artificial** - Verde-água
- **Microsoft 365** - Laranja escuro
- **Microsoft Azure** - Ciano
- **Quantum Computing** - Roxo escuro
- **Security** - Vermelho escuro

## 📦 Build para produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 🌐 Deploy

O projeto pode ser deployado em qualquer serviço de hospedagem estática:
- Vercel
- Netlify
- GitHub Pages
- Azure Static Web Apps

## 📝 Licença

Este projeto é propriedade da MVPConf.

---

Desenvolvido com ❤️ para a comunidade MVP
