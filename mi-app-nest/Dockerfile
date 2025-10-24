#Imagen Node
FROM node:22-alpine

# Carpeta de aplicacion
WORKDIR /app

# Copiamos archivos
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiamos archivos restantes de codigo fuente
COPY . .

# Compilamos el codigo
RUN npm run build

# Exponemos el puerto de acceso al contenedor
EXPOSE 3000

# Comando para ejecutar
CMD ["npm", "run", "start:prod"]