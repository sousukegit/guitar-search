FROM oven/bun:1.1.45

ENV TZ Asia/Tokyo

WORKDIR /usr/src/app

COPY package.json bun.lockb ./
RUN bun install --no-frozen-lockfile

COPY . ./

ENV HOST=0.0.0.0
ENV PORT=3002

CMD ["bun", "run", "dev"]