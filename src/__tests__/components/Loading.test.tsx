import { render, screen } from '@testing-library/react';
import Loading from '@/components/common/Loading';

describe('Loading', () => {
    it('「読み込み中...」のテキストが表示されること', () => {
        render(<Loading />);
        expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    });

    it('スピナーの要素が存在すること', () => {
        render(<Loading />);
        expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
});
