# New Tab Page

一个简洁的新标签页，包含 Google 搜索、GitHub 热榜和 AI 工具快捷入口。

![预览](./preview.png)

## 功能特性

- **时间显示** - 大字体实时显示当前时间
- **Google 搜索** - 快速搜索框
- **GitHub 热榜** - 查看今日/本周/本月热门仓库
- **AI 工具快捷入口** - ChatGPT、Claude、Gemini、DeepSeek、Perplexity、Grok

## 技术栈

- React 18 + TypeScript
- Vite 构建
- Docker 部署

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## Docker 部署

```bash
# 构建并启动
docker-compose up -d --build

# 查看状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 更新部署
git pull && docker-compose up -d --build
```

## 使用方式

### 本地开发环境
访问 `http://localhost:5173`

### Docker 部署
默认访问 `http://localhost:3000`

修改端口编辑 `docker-compose.yml`：
```yaml
ports:
  - "80:80"  # 改为 80 端口
```

### 设为浏览器新标签页

#### Chrome
1. 安装 [custom-new-tab-url](https://chrome.google.com/webstore/detail/custom-new-tab-url/) 扩展
2. 扩展设置中填写你的部署地址

#### Edge
1. 安装 [New Tab Redirect](https://microsoftedge.microsoft.com/addons/detail/new-tab-redirect/) 扩展
2. 设置重定向到你的部署地址

## 配置

### 添加/删除 AI 工具

编辑 `src/components/AITools.tsx`：

```typescript
const aiTools: AITool[] = [
  {
    name: '新工具名',
    url: 'https://tool-url.com',
    icon: '首字母',
    color: '#颜色代码'
  },
  // ...
]
```

### GitHub API 限制

GitHub API 有速率限制，如遇请求失败会自动使用备用数据。

## 项目结构

```
├── src/
│   ├── components/
│   │   ├── Search.tsx        # 搜索组件
│   │   ├── GitHubTrending.tsx # GitHub 热榜
│   │   └── AITools.tsx       # AI 工具栏
│   ├── App.tsx
│   └── main.tsx
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
└── package.json
```

## License

MIT
