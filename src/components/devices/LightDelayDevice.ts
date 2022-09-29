
import { OnOffDeviceBase } from './OnOffDeviceBase';

export class LightDelayDevice extends OnOffDeviceBase {

    constructor(title: string, sensor: string, offDelays: number[], offLabel: string) {
        super(title, 'fas fa-lightbulb', sensor, undefined, offDelays, offLabel);
    }
}