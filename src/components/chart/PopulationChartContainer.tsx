'use client';

import { useState, useEffect } from 'react';
import { getPopulation } from '@/apis/getPopulation';
import PopulationChart from './PopulationChart';
import { PopulationDataPoint, PopulationComposition, Prefecture } from '@/apis/types';
import styles from '@styles/components/PopulationChartContainer.module.scss';

// 人口の種類リスト（単一選択）
const populationLabels: PopulationComposition['label'][] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

type Props = {
    prefectures: Prefecture[];
};

export default function PopulationChartContainer({ prefectures }: Props) {
    const [selectedLabel, setSelectedLabel] = useState<PopulationComposition['label']>('総人口');
    const [chartDataMap, setChartDataMap] = useState<Map<number, PopulationDataPoint[]>>(new Map());
    const [prefNamesMap, setPrefNamesMap] = useState<Map<number, string>>(new Map());
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const promises = prefectures.map(async (prefecture) => {
                    const result = await getPopulation(prefecture.prefCode);
                    const composition = result.data.find((comp: PopulationComposition) => comp.label === selectedLabel);
                    return {
                        prefCode: prefecture.prefCode,
                        prefName: prefecture.prefName,
                        data: composition?.data || [],
                    };
                });

                const results = await Promise.all(promises);
                const newDataMap = new Map();
                const newPrefNamesMap = new Map();

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
    return (
        <div className={styles.container}>
            <div className={styles.buttonGroup}>
                {populationLabels.map((label) => (
                    <button
                        key={label}
                        onClick={() => setSelectedLabel(label)}
                        className={`${styles.button} ${label === selectedLabel ? styles.active : ''}`}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {loading && <p className={styles.message}>読み込み中...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && (
                <PopulationChart dataMap={chartDataMap} prefNames={prefNamesMap} label={selectedLabel} />
            )}
        </div>
    );
}
