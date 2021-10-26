FROM node:16.10.0 AS client-builder

WORKDIR /build

COPY ./client/package.json ./client/yarn.lock ./

RUN yarn install

COPY ./client/public/index.html ./public/index.html

###

FROM node:16.10.0 AS server-builder

WORKDIR /build

COPY ./server/package.json ./server/yarn.lock ./

RUN yarn install

###

FROM node:16.10.0

WORKDIR /app/client

COPY ./client/ ./

COPY --from=client-builder /build/ ./

RUN yarn build

WORKDIR /app/server

COPY ./server/ ./

COPY --from=server-builder /build/ ./

RUN cp -r /app/client/build ./public

RUN yarn run lint && yarn run build

CMD node ./bin/src/index.js
