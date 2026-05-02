import createNextIntlPlugin from 'next-intl/plugin'
import { execSync } from 'node:child_process'

const withNextIntl = createNextIntlPlugin()

const COMMIT_HASH = execSync('git rev-parse --verify HEAD').toString().trim()

const nextConfig = withNextIntl({
    env: {
        AUTHOR_NAME: 'nokya',
        AUTHOR_URL: 'https://nokya.me',
        GITHUB_REPO: 'https://github.com/n0ky4/pyro',
        COMMIT_HASH,
    },
})

export default nextConfig
