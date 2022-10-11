import { SensorsArrayBase } from '../sensors/SensorsArrayBase';

export class UnderfloorPumpGroundDevice extends SensorsArrayBase {
    

    constructor(title: string) {
        super(title, 'fas fa-burn', {
            "1.10.21": "Jakaś pompa",
            "1.10.22": "Jakas inna ",
            "1.10.23": "To jest pompa",
        }, true);
    }

}