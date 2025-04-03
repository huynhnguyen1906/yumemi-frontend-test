import { render, screen } from '@testing-library/react';
import PopulationChart from '@/components/chart/PopulationChart';
import { PopulationDataPoint } from '@/apis/types';

describe('PopulationChart', () => {
    const dataMap = new Map<number, PopulationDataPoint[]>([
        [
            1,
            [
                { year: 1960, value: 100000 },
                { year: 1970, value: 120000 },
            ],
        ],
        [
            2,
            [
                { year: 1960, value: 90000 },
                { year: 1970, value: 110000 },
            ],
        ],
    ]);

    const prefNames = new Map<number, string>([
        [1, '北海道'],
        [2, '青森県'],
    ]);

    // テストケースを追加
    it('タイトルが表示されること', () => {
        render(<PopulationChart dataMap={dataMap} prefNames={prefNames} label="総人口" />);
        expect(screen.getByText('総人口の推移')).toBeInTheDocument();
    });

    // 凡例が表示されること
    it('都道府県名が凡例に表示されること', () => {
        render(<PopulationChart dataMap={dataMap} prefNames={prefNames} label="総人口" />);
        expect(screen.getByText('北海道')).toBeInTheDocument();
        expect(screen.getByText('青森県')).toBeInTheDocument();
    });

    // グラフが表示されること
    it('年度がX軸に表示される（カテゴリが含まれていること）', () => {
        render(<PopulationChart dataMap={dataMap} prefNames={prefNames} label="総人口" />);
        expect(screen.getByText('1960')).toBeInTheDocument();
        expect(screen.getByText('1970')).toBeInTheDocument();
    });
});
