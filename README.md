# New Tab Page

一个简洁的新标签页，使用 Next.js 构建。

## 功能

- ⏰ 实时时钟显示
- 🔍 Google 搜索
- 📈 GitHub 热榜（今日/本周/本月）
- 🤖 AI 工具快捷入口

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build

# 启动生产服务器
npm start
```

## 部署

### Vercel（推荐）

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署

### Dokploy

1. 创建新应用，选择 `Static` 或 `Nixpacks`
2. 连接 GitHub 仓库
3. 配置：
   - Build Command: `npm run build`
   - Output Directory: `.next/static`
4. 部署
