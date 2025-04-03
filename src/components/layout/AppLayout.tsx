'use client';

import { useState } from 'react';
import PrefectureSelector from '../prefecture/PrefectureSelector';
import styles from '@styles/components/AppLayout.module.scss';

export default function AppLayout() {
    const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>都道府県別・人口構成グラフ</h1>
            </header>
            <main className={styles.main}>
                <PrefectureSelector selected={selectedPrefectures} onChange={setSelectedPrefectures} />
                {/* 🔜 今後ここにチャートを追加予定 */}
            </main>
        </div>
    );
}
