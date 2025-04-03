import { renderHook, act, waitFor } from '@testing-library/react';
import { usePopulationData } from '@/hooks/usePopulationData';
import { getPopulation } from '@/apis/getPopulation';
import { Prefecture, GetPopulationResponse } from '@/apis/types';

jest.mock('@/apis/getPopulation');

const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
];

const mockResponse1: GetPopulationResponse = {
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
            {
                label: '年少人口',
                data: [
                    { year: 1960, value: 20000 },
                    { year: 1970, value: 25000 },
                ],
            },
        ],
    },
};

const mockResponse2: GetPopulationResponse = {
    message: null,
    result: {
        boundaryYear: 2020,
        data: [
            {
                label: '総人口',
                data: [
                    { year: 1960, value: 90000 },
                    { year: 1970, value: 110000 },
                ],
            },
            {
                label: '年少人口',
                data: [
                    { year: 1960, value: 18000 },
                    { year: 1970, value: 22000 },
                ],
            },
        ],
    },
};

describe('usePopulationData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // APIのモックをリセット
    it('初期状態で総人口データを取得し、prefCodeごとのMapを構築する', async () => {
        (getPopulation as jest.Mock).mockImplementation((prefCode: number) => {
            return prefCode === 1 ? Promise.resolve(mockResponse1) : Promise.resolve(mockResponse2);
        });

        const { result } = renderHook(() => usePopulationData(mockPrefectures));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBeNull();
        expect(result.current.chartDataMap.size).toBe(2);
        expect(result.current.chartDataMap.get(1)).toEqual(mockResponse1.result.data[0].data);
        expect(result.current.prefNamesMap.get(1)).toBe('北海道');
    });

    // APIのモックが失敗した場合のテスト
    it('人口ラベルを変更するとデータが更新される', async () => {
        (getPopulation as jest.Mock).mockResolvedValue(mockResponse1);

        const { result } = renderHook(() => usePopulationData([mockPrefectures[0]]));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        act(() => {
            result.current.setSelectedLabel('年少人口');
        });

        await waitFor(() => {
            expect(result.current.chartDataMap.get(1)).toEqual(mockResponse1.result.data[1].data);
        });
    });

    // チェックボックスの状態が props.selected に応じて反映されるか
    it('APIエラー時にerrorが設定される', async () => {
        (getPopulation as jest.Mock).mockRejectedValue(new Error('API Error'));

        const { result } = renderHook(() => usePopulationData([mockPrefectures[0]]));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe('データ取得に失敗しました');
        expect(result.current.chartDataMap.size).toBe(0);
    });
});
