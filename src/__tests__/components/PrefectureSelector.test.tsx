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

    // APIのモックをリセット
    it('都道府県一覧を取得して表示できる', async () => {
        render(<PrefectureSelector selected={[]} onChange={() => {}} />);

        await waitFor(() => {
            expect(screen.getByLabelText('北海道')).toBeInTheDocument();
            expect(screen.getByLabelText('青森県')).toBeInTheDocument();
        });
    });

    // APIのモックが失敗した場合のテスト
    it('チェック状態が props.selected に応じて反映される', async () => {
        render(<PrefectureSelector selected={[1]} onChange={() => {}} />);

        const checkbox = await screen.findByLabelText('北海道');
        expect((checkbox as HTMLInputElement).checked).toBe(true);
    });

    // チェックボックスの状態が props.selected に応じて反映されるか
    it('チェック時に onChange が呼び出される', async () => {
        const mockOnChange = jest.fn();
        render(<PrefectureSelector selected={[]} onChange={mockOnChange} />);

        const checkbox = await screen.findByLabelText('北海道');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledWith([1]);
    });

    // チェックボックスの状態が props.selected に応じて反映されるか
    it('チェック解除時に onChange が呼び出される', async () => {
        const mockOnChange = jest.fn();
        render(<PrefectureSelector selected={[1]} onChange={mockOnChange} />);

        const checkbox = await screen.findByLabelText('北海道');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledWith([]); // チェック外したとき
    });
});
