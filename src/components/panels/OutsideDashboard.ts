import { TemperatureSensor } from '../devices/sensors/TemperatureSensor';
import { IMainPanel } from '../../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';
import { LightLevelSensor } from '../devices/sensors/LightLevelSensor';
import { PressureSensor } from '../devices/sensors/PressureSensor';

export class OutsideDashboard extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
                new TemperatureSensor('Temperatura zewnątrz', "0.15.1"),
                new LightLevelSensor('Poziom światła', "0.15.2"),
                new PressureSensor('Ciśnienie atmosferyczne', "0.15.4")
        ]];
    }

}