/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'
import bundleAnalyzer from '@next/bundle-analyzer'

// __dirname is not available in ESM - derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
	turbopack: {
		root: path.join(__dirname, './'),
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
	experimental: {
		optimizePackageImports: ['framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-popover'],
	},
	compiler: {
		// removeConsole: process.env.NODE_ENV === 'production' ? {
		// 	exclude: ['error', 'warn'],
		// } : false,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*.public.blob.vercel-storage.com',
			},
		],
	},
};

export default withBundleAnalyzer(nextConfig);
