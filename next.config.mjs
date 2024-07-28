/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
		serverComponentsExternalPackages: ["@node-rs/argon2"]
	},
	images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/media/**',
      },
      
    ],
  },
};

export default nextConfig;
