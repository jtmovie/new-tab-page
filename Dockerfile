# Build stage
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# 删除默认配置并创建自定义配置
RUN rm -f /etc/nginx/conf.d/default.conf

# 创建完整的 Nginx 配置，确保正确的 MIME types 和响应头
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 基础 MIME types
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
        image/webp webp;
        font/woff woff;
        font/woff2 woff2;
        application/wasm wasm;
    }

    # 默认 MIME type
    default_type application/octet-stream;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 精确匹配 JavaScript 文件，强制正确 Content-Type
    location ~* \.js$ {
        add_header Content-Type application/javascript;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.mjs$ {
        add_header Content-Type application/javascript;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # CSS 文件
    location ~* \.css$ {
        add_header Content-Type text/css;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 图片和其他静态资源
    location ~* \.(png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 测试配置并启动
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
