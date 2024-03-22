FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["node", "build/src/app.js"]
