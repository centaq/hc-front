
import { RollerDeviceBase } from './RollerDeviceBase';

export class GarageDoorDevice extends RollerDeviceBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-warehouse', sensor);
    }
}