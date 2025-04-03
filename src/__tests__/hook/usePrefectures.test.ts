import { renderHook, waitFor } from '@testing-library/react';
import { usePrefectures } from '@/hooks/usePrefectures';
import { getPrefectures } from '@/apis/getPrefectures';
import { Prefecture } from '@/apis/types';

jest.mock('@/apis/getPrefectures');

const mockData: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
];

describe('usePrefectures', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // キャッシュが存在する場合のテスト
    it('都道府県データを取得し、状態に反映される', async () => {
        (getPrefectures as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => usePrefectures());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.prefectures).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    // キャッシュが存在しない場合のテスト
    it('APIエラー時にエラーステートが設定される', async () => {
        (getPrefectures as jest.Mock).mockRejectedValue(new Error('Network Error'));

        const { result } = renderHook(() => usePrefectures());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe('データ取得に失敗しました');
        expect(result.current.prefectures).toEqual([]);
    });
});
