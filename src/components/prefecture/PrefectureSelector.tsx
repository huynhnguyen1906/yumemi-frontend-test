'use client';

import { useEffect, useState } from 'react';
import { Prefecture } from '@/apis/types';
import { getPrefectures } from '@/apis/getPrefectures';
import PrefectureCheckbox from './PrefectureCheckbox';
import styles from '@styles/components/PrefectureSelector.module.scss';

export default function PrefectureSelector() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        const fetchPref = async () => {
            try {
                const data = await getPrefectures();
                setPrefectures(data);
            } catch (error) {
                console.error('都道府県の取得に失敗しました', error);
            }
        };

        fetchPref();
    }, []);

    const handleChange = (prefCode: number, checked: boolean) => {
        setSelected((prev) => (checked ? [...prev, prefCode] : prev.filter((code) => code !== prefCode)));
    };

    return (
        <section className={styles.selector}>
            <h2 className={styles.title}>都道府県を選択</h2>
            <div className={styles.list}>
                {prefectures.map((pref) => (
                    <PrefectureCheckbox
                        key={pref.prefCode}
                        prefCode={pref.prefCode}
                        prefName={pref.prefName}
                        checked={selected.includes(pref.prefCode)}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </section>
    );
}
