import { IDevicesDefinitions } from "src/interfaces/IDevice";
import { IMainPanel } from "src/interfaces/IMainPanel";

export class State {
    public mainPanel: IMainPanel;
    public backgroundWorkerProcessing: boolean;
    public loading: boolean;
    public deviceDefinition: IDevicesDefinitions | null;

    public waitingForData: number;
    public dataToken: string;
    public isDataTokenSet: boolean;

    public sessionId: string;
}