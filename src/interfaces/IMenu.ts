export interface IMenuItem {
    title: string;
    name?: string;
    icon: string;
    children?: IMenuSubItem[];
}

export interface IMenuSubItem {
    title: string;
    name: string;
}