# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# 确保正确设置 MIME types
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 显式设置 MIME types
    types {
        text/html html htm shtml;
        text/css css;
        text/xml xml;
        application/javascript js mjs;
        application/json json;
        application/xml xml;
        image/svg+xml svg svgz;
        image/png png;
        image/jpeg jpg jpeg;
        image/gif gif;
        image/x-icon ico;
        font/woff woff;
        font/woff2 woff2;
        application/wasm wasm;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
