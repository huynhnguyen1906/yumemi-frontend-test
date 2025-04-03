'use client';

import { useEffect, useState } from 'react';
import { Prefecture } from '@/apis/types';
import { getPrefectures } from '@/apis/getPrefectures';
import PrefectureCheckbox from './PrefectureCheckbox';
import styles from '@styles/components/PrefectureSelector.module.scss';

type Props = {
    selected: Prefecture[];
    onChange: (selected: Prefecture[]) => void;
};

export default function PrefectureSelector({ selected, onChange }: Props) {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

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
        const prefecture = prefectures.find((p) => p.prefCode === prefCode);
        if (!prefecture) return;

        onChange(checked ? [...selected, prefecture] : selected.filter((p) => p.prefCode !== prefCode));
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
                        checked={selected.some((p) => p.prefCode === pref.prefCode)}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </section>
    );
}
