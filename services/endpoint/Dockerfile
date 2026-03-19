FROM node:22

WORKDIR /app

COPY package*.json ./

COPY packages ./packages
COPY services ./services

RUN npm install

WORKDIR /app/services/endpoint

EXPOSE 8080

ENV PORT=8080

CMD ["npm", "start"]