export type Prefecture = {
    prefCode: number;
    prefName: string;
};

export type GetPrefecturesResponse = {
    message: null;
    result: Prefecture[];
};

export type PopulationDataPoint = {
    year: number;
    value: number;
};

export type PopulationComposition = {
    label: '総人口' | '年少人口' | '生産年齢人口' | '老年人口';
    data: PopulationDataPoint[];
};

export type GetPopulationResponse = {
    message: string | null;
    result: {
        boundaryYear: number;
        data: PopulationComposition[];
    };
};
