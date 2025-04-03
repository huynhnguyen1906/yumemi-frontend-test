import { getPrefectures } from '@/apis/getPrefectures';
import { apiClient } from '@/libs/apiClient';
import axios from 'axios';

jest.mock('@/libs/apiClient');

describe('getPrefectures', () => {
    it('都道府県のリストを正常に取得できる', async () => {
        const mockData = {
            message: null,
            result: [
                { prefCode: 1, prefName: '北海道' },
                { prefCode: 2, prefName: '青森県' },
            ],
        };

        (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

        const result = await getPrefectures();

        expect(result).toHaveLength(2);
        expect(result[0].prefName).toBe('北海道');
    });

    it('API失敗時に例外を投げる', async () => {
        (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        await expect(getPrefectures()).rejects.toThrow('Network Error');
    });
});
