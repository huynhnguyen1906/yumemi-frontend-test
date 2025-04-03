import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import PrefectureSelector from '@/components/prefecture/PrefectureSelector';
import { getPrefectures } from '@/apis/getPrefectures';

jest.mock('@/apis/getPrefectures');

describe('PrefectureSelector', () => {
    const mockData = [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
    ];

    beforeEach(() => {
        (getPrefectures as jest.Mock).mockResolvedValue(mockData);
    });

    // テストの実行前にモックをリセット
    it('都道府県一覧を取得して表示できる', async () => {
        render(<PrefectureSelector />);

        // API呼び出しを待つ
        await waitFor(() => {
            expect(screen.getByText('北海道')).toBeInTheDocument();
            expect(screen.getByText('青森県')).toBeInTheDocument();
        });
    });

    // チェックボックスの初期状態を確認
    it('チェックボックスをクリックすると選択状態が更新される', async () => {
        render(<PrefectureSelector />);

        // チェックボックスの取得
        const checkbox = await screen.findByLabelText('北海道'); // <label>から取得

        // 初期はunchecked
        expect((checkbox as HTMLInputElement).checked).toBe(false);

        // チェックする
        fireEvent.click(checkbox);

        // チェック済みになる
        expect((checkbox as HTMLInputElement).checked).toBe(true);
    });
});
