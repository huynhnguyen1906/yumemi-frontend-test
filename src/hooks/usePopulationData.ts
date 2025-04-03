'use client';

import { useState, useEffect } from 'react';
import { getPopulation } from '@/apis/getPopulation';
import { PopulationDataPoint, PopulationComposition, Prefecture } from '@/apis/types';

// 人口データの取得とラベル選択をまとめたカスタムフック
export function usePopulationData(prefectures: Prefecture[]) {
    // 選択中の人口ラベル
    const [selectedLabel, setSelectedLabel] = useState<PopulationComposition['label']>('総人口');
    // prefCodeごとの人口データマップ
    const [chartDataMap, setChartDataMap] = useState<Map<number, PopulationDataPoint[]>>(new Map());
    // prefCodeごとの都道府県名マップ
    const [prefNamesMap, setPrefNamesMap] = useState<Map<number, string>>(new Map());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // データ取得処理
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const promises = prefectures.map(async (pref) => {
                    const result = await getPopulation(pref.prefCode);
                    const comp = result.result.data.find((c: PopulationComposition) => c.label === selectedLabel);
                    return {
                        prefCode: pref.prefCode,
                        prefName: pref.prefName,
                        data: comp?.data || [],
                    };
                });

                const results = await Promise.all(promises);
                const newDataMap = new Map<number, PopulationDataPoint[]>();
                const newPrefNamesMap = new Map<number, string>();

                results.forEach(({ prefCode, prefName, data }) => {
                    newDataMap.set(prefCode, data);
                    newPrefNamesMap.set(prefCode, prefName);
                });

                setChartDataMap(newDataMap);
                setPrefNamesMap(newPrefNamesMap);
            } catch (err) {
                console.error(err);
                setError('データ取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [prefectures, selectedLabel]);

    return {
        selectedLabel,
        setSelectedLabel,
        chartDataMap,
        prefNamesMap,
        loading,
        error,
    };
}
