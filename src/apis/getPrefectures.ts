import { apiClient } from '@/libs/apiClient';
import { GetPrefecturesResponse } from './types';

// 都道府県一覧を取得するAPI
export const getPrefectures = async (): Promise<GetPrefecturesResponse['result']> => {
    const { data } = await apiClient.get<GetPrefecturesResponse>('/prefectures');
    return data.result;
};
