FROM node:carbon
MAINTAINER Israel Flores <https://github.com/idflores>

WORKDIR /src

ADD . /src

RUN npm install

CMD ["node", "index.js"]
