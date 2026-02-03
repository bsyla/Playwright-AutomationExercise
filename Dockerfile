FROM mcr.microsoft.com/playwright:v1.43.1-jammy

WORKDIR /work

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV CI=true

CMD ["npx", "playwright", "test"]
