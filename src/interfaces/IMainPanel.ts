import { IDevicesDefinitions } from './IDevice';

export interface IMainPanel {
    render(): string;
    bind(): void;
    unbind(): void;
    getDefinition(): IDevicesDefinitions;
    update(data: any): void;
}