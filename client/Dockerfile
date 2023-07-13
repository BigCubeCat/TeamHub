FROM node:20
WORKDIR /frontend
COPY package.json . 
RUN npm i --force
COPY . . 
EXPOSE 5173
CMD ["npm", "run", "dev"]
