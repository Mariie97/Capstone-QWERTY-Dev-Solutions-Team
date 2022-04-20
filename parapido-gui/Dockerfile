FROM node:16-alpine
WORKDIR /parapido
ENV PATH=/parapido/node_modules/.bin:$PATH
COPY . ./
RUN yarn install --network-timeout=500000
EXPOSE 3000
CMD ["yarn", "start"]
