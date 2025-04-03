'use client';

import { useEffect, useState } from 'react';
import { Prefecture } from '@/apis/types';
import PrefectureSelector from '@/components/prefecture/PrefectureSelector';
import PopulationChartContainer from '@/components/chart/PopulationChartContainer';
import { usePrefectures } from '@/hooks/usePrefectures';
import styles from '@styles/components/AppLayout.module.scss';

export default function AppLayout() {
    const { prefectures, loading, error } = usePrefectures();
    const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);

    // 初期選択：東京 (13) と大阪 (27)
    useEffect(() => {
        if (!loading && prefectures.length > 0 && selectedPrefectures.length === 0) {
            const defaultPrefectures = prefectures.filter((p) => p.prefCode === 13 || p.prefCode === 27);
            setSelectedPrefectures(defaultPrefectures);
        }
    }, [loading, prefectures]);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>都道府県別・人口構成グラフ</h1>
            </header>
            <main className={styles.main}>
                <PrefectureSelector selected={selectedPrefectures} onChange={setSelectedPrefectures} />
                {selectedPrefectures.length > 0 && <PopulationChartContainer prefectures={selectedPrefectures} />}
            </main>
        </div>
    );
}
