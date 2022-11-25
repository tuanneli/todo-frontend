export interface ITodo {
    _id?: string,
    header: string,
    description: string,
    date: string,
    done?: boolean,
    file: any,
    userId?: string,
}