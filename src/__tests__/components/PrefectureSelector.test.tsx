import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureSelector from '@/components/prefecture/PrefectureSelector';
import { Prefecture } from '@/apis/types';

jest.mock('@/hooks/usePrefectures', () => ({
    usePrefectures: () => ({
        prefectures: [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 2, prefName: '青森県' },
        ],
        loading: false,
        error: null,
    }),
}));

describe('PrefectureSelector', () => {
    const mockData: Prefecture[] = [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
    ];

    // チェックボックスの初期状態が正しく設定されること
    it('props.selected に応じてチェックが反映される', () => {
        render(<PrefectureSelector selected={[mockData[0]]} onChange={() => {}} />);

        const checkbox = screen.getByLabelText('北海道') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    // チェックボックスをクリックした際にonChangeが呼ばれること
    it('チェック時に onChange が呼ばれる', () => {
        const mockOnChange = jest.fn();
        render(<PrefectureSelector selected={[]} onChange={mockOnChange} />);

        const checkbox = screen.getByLabelText('北海道');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledWith([mockData[0]]);
    });

    // チェックを外した際にonChangeが呼ばれること
    it('チェック解除時に onChange が呼ばれる', () => {
        const mockOnChange = jest.fn();
        render(<PrefectureSelector selected={[mockData[0]]} onChange={mockOnChange} />);

        const checkbox = screen.getByLabelText('北海道');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledWith([]);
    });

    // 全選択解除ボタンをクリックした際にonChangeが呼ばれること
    it('全ての選択を解除ボタンで onChange([]) が呼ばれる', () => {
        const mockOnChange = jest.fn();
        render(<PrefectureSelector selected={[{ prefCode: 1, prefName: '北海道' }]} onChange={mockOnChange} />);

        const button = screen.getByTestId('unselect-all-button');
        fireEvent.click(button);

        expect(mockOnChange).toHaveBeenCalledWith([]);
    });
});
