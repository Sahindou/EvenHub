FROM node:20-alpine AS builder
WORKDIR /app
# Copie des fichiers de dépendances
COPY package*.json ./
# Installation des dépendances (npm ci pour builds reproductibles)
RUN npm ci 
# Copie du code source
COPY . .
RUN npm run build


FROM nginx:alpine
# Copie de la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copie des fichiers buildés
COPY --from=builder /app/dist /usr/share/nginx/html
# Exposition du port 80
EXPOSE 80
# Démarrage nginx
CMD ["nginx", "-g", "daemon off;"]