import { apiClient } from '@/libs/apiClient';
import { GetPopulationResponse } from './types';

export const getPopulation = async (prefCode: number) => {
    const { data } = await apiClient.get<GetPopulationResponse>(`/population/composition/perYear?prefCode=${prefCode}`);
    return data.result;
};
