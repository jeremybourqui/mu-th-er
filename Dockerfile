FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm rebuild better-sqlite3
RUN npm run build

# Create the data directory for SQLite
RUN mkdir -p /data

ENV DB_PATH=/data/app.db
EXPOSE 3000

# Run migrations then start
CMD ["sh", "-c", "npx drizzle-kit migrate && npm start"]