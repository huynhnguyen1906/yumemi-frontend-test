import AppLayout from '@/components/layout/AppLayout';
import PrefectureSelector from '@/components/prefecture/PrefectureSelector';
export default function Home() {
    return (
        <AppLayout>
            <PrefectureSelector />
        </AppLayout>
    );
}
