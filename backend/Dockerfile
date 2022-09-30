FROM node:16.17.1-bullseye

RUN apt update \
 && apt install dcmtk -y

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "src/app.js"]