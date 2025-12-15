# Estágio 1: Build da aplicação React
FROM node:18-alpine as build

WORKDIR /app

# Copia os arquivos de dependência
COPY package.json ./

# Instala as dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Executa o build (gera a pasta /dist)
RUN npm run build

# Estágio 2: Servidor Web com Nginx
FROM nginx:alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados no estágio de build para o diretório do Nginx
# Nota: Vite gera o build na pasta 'dist' por padrão
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
