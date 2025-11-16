FROM node:20-alpine as build

COPY ./ /app

WORKDIR /app

RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:20-alpine as prod

WORKDIR /app

COPY --from=build /app/dist /app/dist

EXPOSE 8000

CMD ['node', 'dist/main.js']