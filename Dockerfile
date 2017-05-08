FROM node:6

MAINTAINER Alexey Zakharov <zangular@yandex.ru>

ENV NODE_ENV=production

WORKDIR /usr/local/webstarter
COPY ./package.json /usr/local/webstarter/package.json
RUN npm install --production

COPY ./public /usr/local/webstarter/public
COPY ./server /usr/local/webstarter/server

EXPOSE 8088

CMD ["node", "server/app.js"]
