# Use the latest Node.js image as the base image for the build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
RUN apk add --no-cache npm
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir /var/run/dev-test
RUN npm run build

# Use the latest Node.js image as the base image for the runtime container
FROM node:20-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache npm
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]