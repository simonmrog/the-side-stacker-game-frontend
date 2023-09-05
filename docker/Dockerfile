FROM node:18-alpine AS base

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
COPY ../ ./

RUN npm i
