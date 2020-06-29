FROM node:latest AS build
WORKDIR /usr/src/app
COPY . .
RUN echo "export const API_URL = 'https://api.runnea.tk';" > ./src/environments/custom.ts
RUN echo "export const SOCKETS_URL = 'https://sockets.runnea.tk';" >> ./src/environments/custom.ts
RUN echo "export const LOCATION_URL = 'https://location.runnea.tk/';" >> ./src/environments/custom.ts
RUN echo "export const MAP_URL = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';" >> ./src/environments/custom.ts
RUN npm install
RUN npm run-script build

FROM nginx:stable-alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/www /usr/share/nginx/html
EXPOSE 80
