FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3009

CMD ["npm", "run", "dev", "--", "--host"]