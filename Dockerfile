FROM node:18.17-alpine AS builder
RUN mkdir /app
COPY client /app
ARG APP_NAME
RUN cd /app && npm install && npm run build:${APP_NAME}

FROM node:18.17-alpine
RUN mkdir /app
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package-lock.json /app/
RUN cd /app && npm ci --omit dev && npm cache clean --force
RUN npm install pm2 -g
WORKDIR /app
EXPOSE 3009

CMD ["pm2-runtime", "build/index.js"]
