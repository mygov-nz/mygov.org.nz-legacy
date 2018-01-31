FROM node:latest

WORKDIR "/var/www"

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

ENV NODE_ENV production
COPY . /var/www
RUN npm run build && \
      rm -rf /var/www/node_modules && \
      npm install --production && \
      rm -rf /var/www/src

EXPOSE 3000
CMD [ "npm", "start" ]
