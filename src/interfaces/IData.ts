export interface IStateData {
    params: any;
    value: any;
    //notifications: INotificationData[];
}

export interface ISensorData {
    data: any;
    stats: any;
}

export interface INotificationData {
    id: number;
    level: number;
    msg: string;
    date: string;
}