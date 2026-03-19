FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

ENV PORT=8081

CMD ["npm", "start"]