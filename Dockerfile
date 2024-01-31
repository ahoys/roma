FROM node:19-bullseye-slim

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm ci
RUN npm i -g typescript

EXPOSE 9216
CMD ["npm", "build"]
CMD ["node", "dist/rm.js"]