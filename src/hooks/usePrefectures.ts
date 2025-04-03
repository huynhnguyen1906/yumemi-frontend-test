import { useEffect, useState } from 'react';
import { Prefecture } from '@/apis/types';
import { getPrefectures } from '@/apis/getPrefectures';

export function usePrefectures() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPref = async () => {
            try {
                const data = await getPrefectures();
                setPrefectures(data);
            } catch (e) {
                console.error('都道府県の取得に失敗しました', e);
                setError('データ取得に失敗しました');
            } finally {
                setLoading(false);
            }
        };

        fetchPref();
    }, []);

    return { prefectures, loading, error };
}
