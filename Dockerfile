#FROM node:latest AS build

#WORKDIR /usr/src/app
#COPY . .
#RUN npm install
#RUN npm run-script build

#FROM nginx:stable-alpine
#COPY --from=build /usr/src/app/www /usr/share/nginx/html
#EXPOSE 80

# stage1 as builder
FROM node:10-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /app-ui && mv ./node_modules ./app-ui

WORKDIR /app-ui

COPY . .

RUN echo "export const API_URL = 'http://runnea.tk:8080';" > ./src/environments/custom.ts

# Build the project and copy the files
RUN npm run ng build -- --deploy-url=/ --prod


FROM nginx:alpine

#!/bin/sh

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app-ui/www /usr/share/nginx/html

EXPOSE 4200 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]

