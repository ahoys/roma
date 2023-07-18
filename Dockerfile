FROM node:19-bullseye-slim

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN yarn install --production
RUN yarn global add typescript

EXPOSE 9216
CMD ["yarn", "build"]
CMD ["node", "dist/rm.js"]