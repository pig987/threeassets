# 1단계: 프론트 빌드
FROM node:24.22.1 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# 2단계: 서버
FROM node:24.22.1-slim
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
COPY --from=client-build /app/client/dist /app/client/dist
USER node
CMD ["node", "index.js"]