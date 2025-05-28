FROM node:22.16.0-alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . /app/

RUN npm run build

EXPOSE 3000