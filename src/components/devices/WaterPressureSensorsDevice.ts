import { SensorsArrayBase } from '../sensors/SensorsArrayBase';

export class WaterPressureSensorsDevice extends SensorsArrayBase {
    

    constructor(title: string) {
        super(title, 'fas fa-burn', {
            "1.10.50": "Czujnik wody wejściowej",
            "1.10.51": "Czujnik wody po filtrach",
            "1.10.52": "Czujnik CO",
            "1.10.53": "Czujnik CWU",
        }, false, (text: string) => { return text + " bar"; });
    }

}