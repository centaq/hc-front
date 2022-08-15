
import { SensorBase } from './SensorBase';

export class WaterUsageSensor extends SensorBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-tint', [ sensor ], (text: string) => { return text + " dm³"});
    }
}