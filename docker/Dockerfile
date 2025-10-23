FROM node:20-alpine

WORKDIR /app

RUN npm install -g nodemon ts-node

COPY /src/server/package*.json ./
RUN npm install

COPY /src/server .
EXPOSE 3000

CMD [ "nodemon", "--exec", "ts-node", "src/server.ts" ]