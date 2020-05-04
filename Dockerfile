FROM node:latest AS build
WORKDIR /usr/src/app
COPY . .
RUN echo "export const API_URL = 'http://runnea.tk:8080';" > ./src/environments/custom.ts
RUN npm install
RUN npm run-script build

FROM nginx:stable-alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/www /usr/share/nginx/html
EXPOSE 80
