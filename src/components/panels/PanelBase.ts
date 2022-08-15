import { IMainPanel } from '../../interfaces/IMainPanel';
import { IDevice, IDevicesDefinitions } from '../../interfaces/IDevice';

export class PanelBase implements IMainPanel {
    protected devices: IDevice[][];

    constructor() {
        this.devices = [];
    }

    public update(data: any) {
        for(let x in this.devices) {
            let row = this.devices[x];
            for(let y in row) {
                let device = row[y];
                device.update(data[device.getUID()].sensors);
            }
        }
    }

    public getDefinition(): IDevicesDefinitions {
        let definitions = {};
        for(let x in this.devices) {
            let row = this.devices[x];
            for(let y in row) {
                let device = row[y];
                definitions[device.getUID()] = {
                    sensors: device.getDefinition()
                }
            }
        }
        return definitions;
    }

    public render(): string {
        let content = `<div id='main-panel' class="income-order-visit-user-area">`;
        
        for(let x in this.devices) {
            content += `
                <div class="container-fluid">
                    <div class="row">`;
            let row = this.devices[x];
            for(let y in row) {
                let device = row[y];
                content += device.render();
            }
            content += `
                    </div>
                </div>`;
        }
        return content;
    }

    public bind() {
        for(let x in this.devices) {
            let row = this.devices[x];
            for(let y in row) {
                let device = row[y];
                device.bind();
            }
        }
    }

    public unbind() {
        for(let x in this.devices) {
            let row = this.devices[x];
            for(let y in row) {
                let device = row[y];
                device.unbind();
            }
        }
    }
}