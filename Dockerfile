FROM node:18-alpine

WORKDIR /usr/src/api_cms

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD [ "npm","start" ]