
import { SensorBase } from './SensorBase';

export class LightLevelSensor extends SensorBase {

    constructor(title: string, sensor: string);
    constructor(title: string, sensor: string, sensor1?: string) {
        let sensors = [ sensor ];
        if (sensor1 !== undefined) {
            sensors.push(sensor1);
        }
        super(title, 'far fa-sun', sensors, (text: string) => { return text + "%"});
    }
}