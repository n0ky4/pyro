/** @type {import('next').NextConfig} */

const COMMIT_HASH = require('child_process')
    .execSync('git rev-parse --verify HEAD')
    .toString()
    .trim()

const nextConfig = {
    env: {
        AUTHOR_NAME: 'nokya',
        AUTHOR_URL: 'https://github.com/n0ky4',
        GITHUB_REPO: 'https://github.com/n0ky4/pyro',
        COMMIT_HASH,
    },
}

module.exports = nextConfig
