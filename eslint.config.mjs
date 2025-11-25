import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, ...compat.config({
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
    }
}), {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
}]

export default eslintConfig
