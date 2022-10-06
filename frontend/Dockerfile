# Build the react app to static files
FROM node:16.17.1-alpine as build

WORKDIR /app

COPY . ./

RUN npm install

RUN npm run build



FROM caddy:2.6.1

COPY --from=build /app/build ./

COPY Caddyfile ./

EXPOSE 80

EXPOSE 443

CMD [ "caddy", "run"]