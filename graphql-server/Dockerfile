FROM node:alpine

WORKDIR /graphql-server

COPY . .

RUN yarn install


RUN yarn build



CMD ["yarn", "start"]