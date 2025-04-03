'use client';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import styles from '@styles/components/PopulationChart.module.scss';
import { PopulationDataPoint } from '@/apis/types';

type Props = {
    dataMap: Map<number, PopulationDataPoint[]>;
    prefNames: Map<number, string>;
    label: string;
};

export default function PopulationChart({ dataMap, prefNames, label }: Props) {
    // カラーは固定の配列で循環
    const colors = ['#00A0E9', '#E60012', '#009944', '#8957e5', '#f9a8d4', '#84cc16', '#7c3aed'];

    // Highchartsのseriesを生成
    const series = Array.from(dataMap.entries()).map(([prefCode, data], index) => ({
        type: 'line' as const,
        name: prefNames.get(prefCode) || `県コード: ${prefCode}`,
        data: data.map((point) => ({
            x: point.year,
            y: point.value,
        })),
        color: colors[index % colors.length],
    }));

    // Highchartsのオプション
    const options: Highcharts.Options = {
        title: {
            text: `${label}の推移`,
        },
        credits: {
            enabled: false,
        },
        xAxis: {
            title: { text: '年度' },
            categories: dataMap.size > 0 ? Array.from(dataMap.values())[0].map((point) => point.year.toString()) : [],
        },
        yAxis: {
            title: { text: '人口数' },
            labels: {
                formatter: function () {
                    return Highcharts.numberFormat(Number(this.value), 0, '', ',');
                },
            },
        },
        series,
        tooltip: {
            formatter: function () {
                return `${this.x}年<br/>${this.series.name}: <b>${Highcharts.numberFormat(
                    Number(this.y),
                    0,
                    '',
                    ',',
                )}人</b>`;
            },
        },
        plotOptions: {
            series: {
                animation: { duration: 500 },
                marker: { enabled: true },
            },
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            itemMarginTop: 5,
            itemMarginBottom: 5,
        },
        accessibility: {
            enabled: false,
        },
    };

    return (
        <div className={styles.chart}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
