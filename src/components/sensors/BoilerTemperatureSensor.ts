
import { SensorBase } from './SensorBase';

export class BoilerTemperatureSensor extends SensorBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-burn', [ sensor ], (text: string) => { return text + "°C"});
    }
}