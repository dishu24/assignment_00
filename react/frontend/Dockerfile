FROM node:16.17-alpine
WORKDIR /react
COPY package.json ./
# RUN npm install --verbose

COPY . .
EXPOSE 3000
CMD ["npm","start"]
RUN npm run build