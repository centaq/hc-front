import { TemperatureSensor } from '../components/devices/sensors/TemperatureSensor';
import { IMainPanel } from '../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';

export class OfficePanel extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
                new TemperatureSensor('Temperatura', "2.15.1"),
                new TemperatureSensor('Grzejnik zasilanie', "2.15.2"),
                new TemperatureSensor('Grzejnik powrót', "2.15.3")
        ]];
    }

}