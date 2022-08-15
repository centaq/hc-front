import { IMainPanel } from '../../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';
import { CameraDevice } from '../devices/CameraDevice';
import { IDevicesDefinitions } from 'src/interfaces/IDevice';
import { Guid } from 'guid-typescript';

export class CameraPanel extends PanelBase implements IMainPanel {
    private uid: string = Guid.create().toString();

    constructor() {
        super();
        this.devices = [ [
            new CameraDevice("Kamera pokój", 1)
        ]];
    }

    public getDefinition(): IDevicesDefinitions {
        let definitions = {};
        definitions[this.uid] = { sensors: [] };

        return {};
    }

}