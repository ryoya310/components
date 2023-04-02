const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  // APIのルートパス
  env: {
    API_ROOT: process.env.API_ROOT,
  },
  // サブディレクトリにアップする場合
  basePath: isProd ? '/components' : '',
  assetPrefix: isProd ? '/components' : '',
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
	staticPageGenerationTimeout: 1500,
  experimental: {
    reactRefresh: true
  },
  future: {
    webpack5: true,
  },
}
module.exports = nextConfig