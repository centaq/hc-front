
import { SensorBase } from './SensorBase';

export class EnergyUsageSensor extends SensorBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-bolt', [ sensor ], (text: string) => { return text + " kWh"});
    }
}