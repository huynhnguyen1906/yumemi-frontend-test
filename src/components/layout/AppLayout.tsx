import { ReactNode } from 'react';
import styles from '@styles/components/AppLayout.module.scss';

type Props = {
    children?: ReactNode;
};

export default function AppLayout({ children }: Props) {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>都道府県別・人口構成グラフ</h1>
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}
