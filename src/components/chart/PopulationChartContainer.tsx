'use client';

import styles from '@styles/components/PopulationChartContainer.module.scss';
import { usePopulationData } from '@/hooks/usePopulationData';
import { PopulationComposition, Prefecture } from '@/apis/types';
import PopulationChart from './PopulationChart';
import Loading from '../common/Loading';

// 人口の種類リスト（単一選択）
const populationLabels: PopulationComposition['label'][] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

type Props = {
    prefectures: Prefecture[];
};

export default function PopulationChartContainer({ prefectures }: Props) {
    // カスタムフックから状態と関数を取得
    const { selectedLabel, setSelectedLabel, chartDataMap, prefNamesMap, loading, error } =
        usePopulationData(prefectures);

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

            {loading && <Loading />}
            {error && <p className={styles.error}>{error}</p>}

            {!loading && !error && (
                <PopulationChart dataMap={chartDataMap} prefNames={prefNamesMap} label={selectedLabel} />
            )}
        </div>
    );
}
