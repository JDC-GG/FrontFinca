# Etapa 1: Compilación de Angular
FROM node:18.19.1 AS builder

WORKDIR /app

# Copiar archivos de dependencias y luego instalar
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar todo el código fuente
COPY . .

# Instalar Angular CLI globalmente y construir la app
RUN npm install -g @angular/cli \
    && ng build --configuration=production --skip-prerender




# Etapa 2: Servir con Apache HTTPD
FROM httpd:2.4

# Copiar configuración personalizada si la tienes (opcional)
COPY ./k8s/my-httpd.conf /usr/local/apache2/conf/httpd.conf
COPY ./k8s/.htaccess /usr/local/apache2/htdocs/

# Copiar los archivos compilados desde la etapa anterior
COPY --from=builder /app/dist/adminpro /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd", "-D", "FOREGROUND"]