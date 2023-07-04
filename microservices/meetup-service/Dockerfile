FROM node:18

WORKDIR /meetup-service
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE $PORT
CMD ["node", "-r", "esm", "src/index.js"]