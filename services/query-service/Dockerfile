FROM node:22

WORKDIR /app

COPY package*.json ./

COPY packages ./packages
COPY services ./services

RUN npm install

WORKDIR /app/services/query-service

EXPOSE 8082

ENV PORT=8082

CMD ["npm", "start"]