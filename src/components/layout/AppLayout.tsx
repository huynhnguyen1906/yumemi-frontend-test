'use client';

import { useState } from 'react';
import { Prefecture } from '@/apis/types';
import PrefectureSelector from '@/components/prefecture/PrefectureSelector';
import PopulationChartContainer from '@/components/chart/PopulationChartContainer';
import styles from '@styles/components/AppLayout.module.scss';

export default function AppLayout() {
    const [selectedPrefectures, setSelectedPrefectures] = useState<Prefecture[]>([]);

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
