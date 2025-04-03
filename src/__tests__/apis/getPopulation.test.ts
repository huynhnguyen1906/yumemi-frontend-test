import { getPopulation } from '@/apis/getPopulation';
import { apiClient } from '@/libs/apiClient';
import { GetPopulationResponse } from '@/apis/types';

jest.mock('@/libs/apiClient');

describe('getPopulation (with cache)', () => {
    const mockResponse: GetPopulationResponse = {
        message: null,
        result: {
            boundaryYear: 2020,
            data: [
                {
                    label: '総人口',
                    data: [
                        { year: 1960, value: 100000 },
                        { year: 1970, value: 120000 },
                    ],
                },
            ],
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // テストケースの実行前にキャッシュをクリア
    it('APIからデータを取得してキャッシュする', async () => {
        (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const result = await getPopulation(1);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith('/population/composition/perYear?prefCode=1');
        expect(result).toEqual(mockResponse);
    });

    // キャッシュが存在する場合はAPIを呼ばずにキャッシュから取得
    it('同じprefCodeで再度呼び出した場合、APIを呼ばずにキャッシュから取得する', async () => {
        // キャッシュされている前提で、APIを呼び出さないようにする
        const result = await getPopulation(1);

        expect(apiClient.get).not.toHaveBeenCalled();
        expect(result).toEqual(mockResponse);
    });

    // キャッシュが存在しない場合はAPIを呼び出す
    it('別のprefCodeで呼び出した場合は新たにAPIを呼び出す', async () => {
        const newResponse: GetPopulationResponse = {
            message: null,
            result: {
                boundaryYear: 2020,
                data: [
                    {
                        label: '総人口',
                        data: [{ year: 1960, value: 99999 }],
                    },
                ],
            },
        };

        (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: newResponse });

        const result = await getPopulation(2);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith('/population/composition/perYear?prefCode=2');
        expect(result).toEqual(newResponse);
    });
});
