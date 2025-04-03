import { getPrefectures } from '@/apis/getPrefectures';
import { apiClient } from '@/libs/apiClient';

jest.mock('@/libs/apiClient');

beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
});

describe('getPrefectures', () => {
    // 正常系：APIから都道府県リストを取得できること
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

    // 異常系：APIが失敗した場合に例外を投げること
    it('API失敗時に例外を投げる', async () => {
        (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error('Network Error'));

        await expect(getPrefectures()).rejects.toThrow('Network Error');
    });

    // キャッシュが有効な場合はAPIを呼ばないこと
    it('キャッシュがある場合はAPIを呼ばない', async () => {
        const fakeData = [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 2, prefName: '青森県' },
        ];

        const cache = {
            data: fakeData,
            timestamp: Date.now(),
        };

        localStorage.setItem('cached_prefectures_with_expiry', JSON.stringify(cache));

        const result = await getPrefectures();

        expect(result).toEqual(fakeData);
        expect(apiClient.get).not.toHaveBeenCalled();
    });

    // キャッシュが無効な場合はAPIを呼ぶこと
    it('キャッシュの有効期限が切れている場合はAPIを再度呼ぶ', async () => {
        const expiredCache = {
            data: [{ prefCode: 99, prefName: '期限切れ県' }],
            timestamp: Date.now() - 1000 * 60 * 60 * 25, // TTL = 24h → expired
        };

        localStorage.setItem('cached_prefectures_with_expiry', JSON.stringify(expiredCache));

        const freshData = {
            message: null,
            result: [
                { prefCode: 1, prefName: '北海道' },
                { prefCode: 2, prefName: '青森県' },
            ],
        };

        (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: freshData });

        const result = await getPrefectures();

        expect(result).toEqual(freshData.result);
        expect(apiClient.get).toHaveBeenCalledTimes(1);
    });
});
