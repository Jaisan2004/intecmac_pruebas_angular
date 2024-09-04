# Etapa de construcción
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa final
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar las dependencias instaladas desde la etapa de construcción
COPY --from=build /app/node_modules ./node_modules

# Copiar el código compilado
COPY --from=build /app/dist ./dist

# Copiar el archivo .env
COPY .env .env

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Exponer el puerto (si es necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["nodemon", "dist/index.js"]
