# Compile and Build Angular Application
FROM node:16-alpine AS build
ARG config
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build --configuration $config

# Serve Application using Nginx Server
FROM nginx:1.23.1-alpine
COPY --from=build /app/dist/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
