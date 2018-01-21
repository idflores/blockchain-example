FROM node:carbon
MAINTAINER Israel Flores <https://github.com/idflores>

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 443

CMD FORCE_COLOR=1 node app.js
