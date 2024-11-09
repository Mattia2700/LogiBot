# Fase 1: Costruzione
FROM node:18 AS build-stage

WORKDIR /app

# Copia i file package.json e package-lock.json
# COPY package*.json ./

# Installa le dipendenze
# RUN npm install

# Copia il resto dei file del progetto
# COPY . .

# Espone la porta utilizzata da Vite
#EXPOSE 5173
EXPOSE 8088

# Avvia Vite in modalità sviluppo
ENTRYPOINT ["npm", "run", "dev"]

# Comando per la diagnostica e l'esecuzione del server di sviluppo
# CMD ["sh", "-c", "npm list vite && npm run dev"]