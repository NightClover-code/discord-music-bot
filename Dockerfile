FROM node:16-slim
WORKDIR /app
COPY package.json . 
RUN yarn install
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]