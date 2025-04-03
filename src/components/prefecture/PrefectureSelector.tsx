'use client';

import { Prefecture } from '@/apis/types';
import { usePrefectures } from '@/hooks/usePrefectures';
import PrefectureCheckbox from './PrefectureCheckbox';
import styles from '@styles/components/PrefectureSelector.module.scss';

type Props = {
    selected: Prefecture[];
    onChange: (selected: Prefecture[]) => void;
};

export default function PrefectureSelector({ selected, onChange }: Props) {
    const { prefectures, loading, error } = usePrefectures();

    const handleChange = (prefCode: number, checked: boolean) => {
        const prefecture = prefectures.find((p) => p.prefCode === prefCode);
        if (!prefecture) return;

        onChange(checked ? [...selected, prefecture] : selected.filter((p) => p.prefCode !== prefCode));
    };

    return (
        <section className={styles.selector}>
            <h2 className={styles.title}>都道府県を選択</h2>
            {loading && <p className={styles.message}>読み込み中...</p>}
            {error && <p className={styles.error}>{error}</p>}
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
            <div className={styles.actions}>
                <button
                    className={styles.unselectButton}
                    onClick={() => onChange([])}
                    data-testid="unselect-all-button"
                >
                    全ての選択を解除
                </button>
            </div>
        </section>
    );
}
