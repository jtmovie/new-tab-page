/** @type {import('next').NextConfig} */
const nextConfig = {
  // 导出为纯静态 HTML，适合 Dokploy 静态部署
  output: 'export',
  // 不生成图片优化（静态导出不需要）
  images: { unoptimized: true },
  // 确保静态文件使用相对路径
  trailingSlash: true,
}

module.exports = nextConfig
