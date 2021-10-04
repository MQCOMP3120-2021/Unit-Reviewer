FROM node

WORKDIR /app

COPY . .

WORKDIR /app/client

RUN yarn install

RUN yarn run build

RUN cp -r ./build ../server/public

WORKDIR /app/server

RUN yarn install

RUN yarn run lint && yarn run build

CMD node ./bin/index.js