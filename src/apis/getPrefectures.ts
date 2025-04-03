import { apiClient } from '@/libs/apiClient';
import { GetPrefecturesResponse, Prefecture } from './types';

const LOCAL_STORAGE_KEY = 'cached_prefectures_with_expiry';
const TTL_MS = 24 * 60 * 60 * 1000; // 1日 = 86400000ms

type CacheData = {
    data: Prefecture[];
    timestamp: number;
};

// 都道府県一覧を取得するAPI（1日キャッシュ）
export const getPrefectures = async (): Promise<Prefecture[]> => {
    if (typeof window !== 'undefined') {
        const cache = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cache) {
            const parsed: CacheData = JSON.parse(cache);
            const now = Date.now();

            if (now - parsed.timestamp < TTL_MS) {
                return parsed.data;
            } else {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
    }

    const { data } = await apiClient.get<GetPrefecturesResponse>('/prefectures');

    if (typeof window !== 'undefined') {
        const payload: CacheData = {
            data: data.result,
            timestamp: Date.now(),
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
    }

    return data.result;
};
