export interface TableInterface {
    config: Config[];
    data: Array<Record<any, any>>,
    className?: string
}

export interface Config {
    header: string;
    key: string;
    Cell?: (data: any) => any
}