/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'u.fmyeah.com',
                port: '',
                pathname: '/i15/**',
            },
        ],
    },
}

export default nextConfig
