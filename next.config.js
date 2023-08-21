/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

module.exports = nextConfig
