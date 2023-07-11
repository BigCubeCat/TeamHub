FROM node:18

WORKDIR /notif
COPY package.json .
RUN npm i
COPY . .
CMD npm run start

