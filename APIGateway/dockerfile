FROM node:18
WORKDIR /srv/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 7000
CMD ["node", "dist/index.js"]