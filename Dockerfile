# stage 1: building app
FROM node:lts-alpine3.21 AS builder
# set working directory
WORKDIR /app
# copy file esensial untuk install dependency
COPY package.json package-lock.json ./
# install package
RUN npm ci
# copy sisanya
COPY . .
# build dengan command vite build
RUN npm run build
# stage 2: setup app
FROM nginx:stable-bookworm
# copy premade config
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/
COPY --from=builder /app/nginx/sites-available/app.conf /etc/nginx/sites-available/
# create symlink
RUN mkdir -p /etc/nginx/sites-enabled
RUN ln -s /etc/nginx/sites-available/app.conf /etc/nginx/sites-enabled/
# copy aplikasi dari builder ke lokasi serve
RUN mkdir -p /var/www/client
COPY --from=builder /app/dist /var/www/client
# buka port untuk akses nginx
EXPOSE 80
# jalankan nginx di foreground
CMD [ "nginx", "-g", "daemon off;" ]