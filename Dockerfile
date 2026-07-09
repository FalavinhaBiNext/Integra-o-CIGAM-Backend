FROM node:22-alpine AS build

WORKDIR /app

ENV NODE_ENV=development

COPY package.json package-lock.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

FROM node:22-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

RUN mkdir -p uploads/pdfs
RUN mkdir -p dist/database/seeders

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', r => {process.exit(r.statusCode === 200 ? 0 : 1)}).on('error', () => process.exit(1))"

RUN rm -f .sequelizerc && \
    echo 'const path = require("path");' > .sequelizerc && \
    echo 'module.exports = {' >> .sequelizerc && \
    echo '  config: path.resolve("dist", "database", "config", "database.js"),' >> .sequelizerc && \
    echo '  "models-path": path.resolve("dist", "database", "models"),' >> .sequelizerc && \
    echo '  "seeders-path": path.resolve("dist", "database", "seeders"),' >> .sequelizerc && \
    echo '  "migrations-path": path.resolve("dist", "database", "migrations")' >> .sequelizerc && \
    echo '};' >> .sequelizerc && \
    cat .sequelizerc

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "npm run db:migrate && npm run start"]