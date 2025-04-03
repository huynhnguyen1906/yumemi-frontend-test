import styles from '@styles/components/PrefectureCheckbox.module.scss';
import { Prefecture } from '@/apis/types';

type Props = Pick<Prefecture, 'prefCode' | 'prefName'> & {
    checked: boolean;
    onChange: (prefCode: number, checked: boolean) => void;
};

export default function PrefectureCheckbox({ prefCode, prefName, checked, onChange }: Props) {
    return (
        <label className={styles.checkbox}>
            <input type="checkbox" checked={checked} onChange={(e) => onChange(prefCode, e.target.checked)} />
            <span>{prefName}</span>
        </label>
    );
}
