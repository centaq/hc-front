
import { OnOffDeviceBase } from './OnOffDeviceBase';

export class LightDevice extends OnOffDeviceBase {

    constructor(title: string, sensor: string) {
        super(title, 'fas fa-lightbulb', sensor);
    }
}