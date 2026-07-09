FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

RUN mkdir -p uploads/pdfs

EXPOSE 3000

ENV NODE_ENV=production

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

RUN echo 'const path = require("path"); module.exports = { config: path.resolve("dist", "database", "config", "database.js"), "models-path": path.resolve("dist", "database", "models"), "seeders-path": path.resolve("dist", "database", "seeders"), "migrations-path": path.resolve("dist", "database", "migrations") };' > .sequelizerc

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npx sequelize db:migrate && node dist/server.js"]
