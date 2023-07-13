FROM node:18.13.0-buster-slim as base

#-------------------------------------------------------------------------------
FROM base as web-prepare


WORKDIR /usr/src/web

COPY package.json package.json

RUN yarn install
COPY . .

#--------------

FROM web-prepare as web-build
RUN yarn build

#-------------------------------------------------------------------------------
FROM nginx:1.21.6 as web

COPY /nginx.conf  /etc/nginx/conf.d/default.conf
COPY --from=web-build /usr/src/web/dist/angular-graph-ql /usr/share/nginx/html
