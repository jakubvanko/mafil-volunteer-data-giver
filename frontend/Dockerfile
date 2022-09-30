# Build the react app to static files
FROM node:16.17.1-alpine as build

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build"]