FROM node:18

WORKDIR /notifer
COPY package.json .
RUN npm i
COPY . .
CMD npm run start
