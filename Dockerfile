FROM node:22.12.0

ENV TZ Asia/Tokyo

WORKDIR /usr/src/next-app

RUN apt-get update

COPY package.json bun.lockb ./
RUN bun install

CMD ["bun", "run", "dev"]

COPY . ./

ENV HOST=0.0.0.0
ENV PORT=3002