
import { SensorBase } from './SensorBase';

export class PressureLevelSensor extends SensorBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-thermometer-half', [ sensor ], (text: string) => { return text + " bar"});
    }
}