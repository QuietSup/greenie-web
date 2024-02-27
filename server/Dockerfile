FROM node:21-bookworm-slim

RUN apt-get update && apt-get install -y procps

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]