FROM node:slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /usr/src/app

COPY package.json ./

COPY .env .env

COPY . .

RUN npm install

RUN npm run build

CMD ["sh", "-c", "npm run db:deploy && npm start"]

EXPOSE 3000