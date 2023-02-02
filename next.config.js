module.exports = {
    images: {
        disableStaticImages: true,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        minimumCacheTTL: 20,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '194.195.116.146',
                port: '8000',
            }
        ]
    },
};