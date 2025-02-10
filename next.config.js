/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin')
const withNextIntl = createNextIntlPlugin()

const COMMIT_HASH = require('child_process')
    .execSync('git rev-parse --verify HEAD')
    .toString()
    .trim()

const nextConfig = withNextIntl({
    env: {
        AUTHOR_NAME: 'nokya',
        AUTHOR_URL: 'https://nokya.me',
        GITHUB_REPO: 'https://github.com/n0ky4/pyro',
        COMMIT_HASH,
    },
})

module.exports = nextConfig
