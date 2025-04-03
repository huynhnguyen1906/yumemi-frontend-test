import { render, screen, fireEvent } from '@testing-library/react';
import PrefectureCheckbox from '@/components/prefecture/PrefectureCheckbox';

describe('PrefectureCheckbox', () => {
    const mockOnChange = jest.fn();

    // 初期描画のテスト
    it('都道府県名が正しく表示されること', () => {
        render(<PrefectureCheckbox prefCode={1} prefName="北海道" checked={false} onChange={mockOnChange} />);

        expect(screen.getByLabelText('北海道')).toBeInTheDocument();
    });

    // checked状態のテスト
    it('checkedプロパティが正しく反映されること', () => {
        render(<PrefectureCheckbox prefCode={2} prefName="青森県" checked={true} onChange={mockOnChange} />);

        const checkbox = screen.getByLabelText('青森県') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    // onChange発火のテスト
    it('チェック時にonChangeが呼び出されること', () => {
        render(<PrefectureCheckbox prefCode={3} prefName="岩手県" checked={false} onChange={mockOnChange} />);

        const checkbox = screen.getByLabelText('岩手県');
        fireEvent.click(checkbox);

        expect(mockOnChange).toHaveBeenCalledWith(3, true); // prefCode, checked
    });
});
