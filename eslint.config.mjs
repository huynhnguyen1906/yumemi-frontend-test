import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    // Next.jsからのベース設定
    ...compat.extends('next/core-web-vitals', 'next/typescript'),

    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        plugins: ['prettier'],
        rules: {
            'prettier/prettier': 'warn', // またはCIを失敗させたい場合は'error'
        },
    },
];

export default eslintConfig;
