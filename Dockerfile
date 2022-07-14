FROM node:16
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN tsc 
CMD ["yarn", "start"]