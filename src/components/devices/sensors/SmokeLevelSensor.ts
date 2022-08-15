
import { SensorBase } from './SensorBase';

export class SmokeLevelSensor extends SensorBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-smog', [ sensor ], (text: string) => { return text + "%"});
    }
}