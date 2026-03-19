FROM node:22

WORKDIR /app

COPY package*.json ./

COPY packages ./packages
COPY services ./services

RUN npm install

WORKDIR /app/services/health

EXPOSE 8085

ENV PORT=8085

CMD ["npm", "start"]