# Stage 1: Build React app with Vite
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Optional debug steps (can remove later)
RUN ls -la /app
RUN ls -la /app/dist

# Stage 2: Serve with nginx, configured to listen on port 8709
FROM nginx:alpine

# Set environment variable PORT for consistency (Cloud Run uses this)
ENV PORT=8709

# Replace default nginx listen port (80) with $PORT (8709)
RUN sed -i "s/listen 80;/listen ${PORT};/" /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
