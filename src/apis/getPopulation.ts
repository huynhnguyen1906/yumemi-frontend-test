import { apiClient } from '@/libs/apiClient';
import { GetPopulationResponse } from './types';

// 都道府県ごとの人口データをキャッシュするMap
const populationCache = new Map<number, GetPopulationResponse>();

// 人口構成データを取得する（prefCode単位でキャッシュあり）
export const getPopulation = async (prefCode: number): Promise<GetPopulationResponse> => {
    // キャッシュが存在する場合はそれを返す
    if (populationCache.has(prefCode)) {
        return populationCache.get(prefCode)!;
    }

    // APIから取得してキャッシュに保存
    const { data } = await apiClient.get<GetPopulationResponse>(`/population/composition/perYear?prefCode=${prefCode}`);

    populationCache.set(prefCode, data);
    return data;
};
