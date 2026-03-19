FROM node:22

WORKDIR /app

COPY package*.json ./

COPY packages ./packages
COPY services ./services

RUN npm install

WORKDIR /app/services/socket

EXPOSE 8084

ENV PORT=8084

CMD ["npm", "start"]