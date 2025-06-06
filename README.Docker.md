# MVP Conf 2025 - Docker Setup

Este documento explica como executar a aplicação MVP Conf 2025 usando Docker.

## Pré-requisitos

- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)

## Executando a Aplicação

### Opção 1: Docker Compose (Recomendado)

```bash
# Construir e executar a aplicação
docker-compose up --build

# Executar em background
docker-compose up -d --build

# Parar a aplicação
docker-compose down
```

A aplicação estará disponível em: http://localhost:3000

### Opção 2: Docker Build Manual

```bash
# Construir a imagem
docker build -t mvp-conf-2025 .

# Executar o container
docker run -p 3000:80 mvp-conf-2025

# Executar em background
docker run -d -p 3000:80 --name mvp-conf mvp-conf-2025
```

## Comandos Úteis

### Gerenciamento de Containers

```bash
# Listar containers em execução
docker ps

# Ver logs da aplicação
docker-compose logs -f mvp-conf-app

# Parar um container específico
docker stop mvp-conf

# Remover container
docker rm mvp-conf

# Remover imagem
docker rmi mvp-conf-2025
```

### Desenvolvimento

```bash
# Reconstruir apenas quando houver mudanças
docker-compose up --build

# Forçar reconstrução completa
docker-compose build --no-cache
docker-compose up
```

## Configuração de Produção

Para produção, você pode usar o perfil `production` que inclui um proxy reverso:

```bash
# Executar com proxy reverso
docker-compose --profile production up -d
```

### Variáveis de Ambiente

Crie um arquivo `.env` para configurações específicas:

```env
# Porta da aplicação
APP_PORT=3000

# Ambiente
NODE_ENV=production

# Configurações de SSL (para produção)
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/key.pem
```

## Health Check

A aplicação inclui um endpoint de health check em `/health` que retorna:
- Status 200 com "healthy" quando a aplicação está funcionando
- Usado pelo Docker para monitorar a saúde do container

## Otimizações

### Build Multi-stage
- **Stage 1**: Instala dependências e constrói a aplicação
- **Stage 2**: Serve os arquivos estáticos com Nginx

### Nginx
- Compressão Gzip habilitada
- Cache de arquivos estáticos (1 ano)
- Headers de segurança configurados
- Suporte a client-side routing (SPA)

### Segurança
- Container roda como usuário não-root
- Arquivos desnecessários excluídos via `.dockerignore`
- Headers de segurança configurados no Nginx

## Troubleshooting

### Container não inicia
```bash
# Verificar logs
docker-compose logs mvp-conf-app

# Verificar se a porta está em uso
netstat -tulpn | grep :3000
```

### Problemas de build
```bash
# Limpar cache do Docker
docker system prune -a

# Reconstruir sem cache
docker-compose build --no-cache
```

### Problemas de rede
```bash
# Verificar redes Docker
docker network ls

# Inspecionar rede específica
docker network inspect mvp-conf-2025_default
```

## Monitoramento

### Logs
```bash
# Logs em tempo real
docker-compose logs -f

# Logs de um serviço específico
docker-compose logs -f mvp-conf-app
```

### Métricas
```bash
# Uso de recursos
docker stats

# Informações do container
docker inspect mvp-conf-app
```

## Deploy em Produção

### Docker Hub
```bash
# Tag da imagem
docker tag mvp-conf-2025 username/mvp-conf-2025:latest

# Push para Docker Hub
docker push username/mvp-conf-2025:latest
```

### Servidor de Produção
```bash
# Pull da imagem
docker pull username/mvp-conf-2025:latest

# Executar em produção
docker run -d \
  --name mvp-conf-prod \
  --restart unless-stopped \
  -p 80:80 \
  username/mvp-conf-2025:latest
```