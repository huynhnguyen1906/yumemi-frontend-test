export type Prefecture = {
    prefCode: number;
    prefName: string;
};

export type GetPrefecturesResponse = {
    message: null;
    result: Prefecture[];
};
