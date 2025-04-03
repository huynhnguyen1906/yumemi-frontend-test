import styles from '@styles/components/Loading.module.scss';

export default function Loading() {
    return (
        <div className={styles.wrapper} data-testid="loading">
            <div className={styles.spinner} />
            <p className={styles.text}>読み込み中...</p>
        </div>
    );
}
