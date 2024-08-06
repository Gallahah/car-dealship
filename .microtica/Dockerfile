FROM public.ecr.aws/docker/library/node:16.16.0-slim
WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

COPY server/ .

CMD ["node", "your-app-entry-point.js"]
