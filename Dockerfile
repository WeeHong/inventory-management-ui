FROM node:latest

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV ${app_env}

RUN mkdir -p /frontend
WORKDIR /var/www/html
COPY . /var/www/html

RUN npm install && npm update

ENV PATH /var/www/html/node_moduels/./bin:$PATH

CMD ["npm", "start"]