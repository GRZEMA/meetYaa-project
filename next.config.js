/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		NEXTAUTH_SECRET: 'ifQgNLkf/QrKVmTSdSjexkj+sH9sAdckDuLHXRFrdkA=',
		DB_LOGIN: 'dawidkrzmnsk',
		DB_PASS: '5O3LDanAeUDkW7Vt',
	},
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
