FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm ci --only=production

EXPOSE 3000
CMD [ "node", "index.js" ]
