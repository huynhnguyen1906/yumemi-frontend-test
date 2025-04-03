import axios from 'axios';

// Axiosのインスタンスを生成
export const apiClient = axios.create({
    baseURL: 'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
