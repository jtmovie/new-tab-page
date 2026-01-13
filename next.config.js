/** @type {import('next').NextConfig} */
const nextConfig = {
  // 导出为纯静态 HTML（输出到 out/ 目录）
  output: 'export',
  // 不生成图片优化
  images: { unoptimized: true },
}

module.exports = nextConfig
