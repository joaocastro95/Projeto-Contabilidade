# Use a imagem base oficial do Node.js
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o restante do código para o contêiner
COPY . .

# Exponha a porta 3000 (ou a porta que a aplicação utiliza)
EXPOSE 3000

# Defina o comando padrão para rodar a aplicação
CMD ["node", "app.js"]