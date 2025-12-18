/** @type {import('next').NextConfig} */
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname is not available in ESM - derive it from import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nextConfig = {
	webpack(config) {
		// No-op webpack modifications; Turbopack will handle SVGR via `turbopack.rules`.
		return config
	},
	turbopack: {
		root: path.join(__dirname, './'),
		rules: {
			"*.svg": {
				loaders: ["@svgr/webpack"],
				as: "*.js",
			},
		},
	},
};

export default nextConfig;
