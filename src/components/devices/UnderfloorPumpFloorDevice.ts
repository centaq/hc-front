import { SensorsArrayBase } from '../sensors/SensorsArrayBase';

export class UnderfloorPumpFloorDevice extends SensorsArrayBase {
    

    constructor(title: string) {
        super(title, 'fas fa-burn', {
            "1.10.25": "Jakaś pompa",
            "1.10.26": "Jakas inna ",
            "1.10.27": "To jest pompa",
        }, true);
    }

}