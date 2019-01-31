FROM node:8

# create working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

EXPOSE 8000
EXPOSE 27017

CMD ["npm", "start"]