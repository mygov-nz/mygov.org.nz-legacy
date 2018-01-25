FROM node:latest

WORKDIR "/var/www"

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY . /var/www
ENV NODE_ENV production
RUN npm run build
RUN rm -rf /var/www/src

EXPOSE 3000
CMD [ "npm", "start" ]
