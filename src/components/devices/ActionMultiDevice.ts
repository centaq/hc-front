
import { IDevice, IDeviceOptions, IDeviceContent, IDeviceContentOptions, DefaultDeviceHeader, IDeviceHeaderOptions, ActionMultiSensor, IActionComponent, ButtonsActionComponent, ActionMultiDeviceContentRow, ActionMultiSensorType, PreviewRowComponent, HeaterRowComponent, PreviewOnOffRowComponent } from "../../interfaces/IDevice";
import { DeviceBase } from "./DeviceBase";
import { Guid } from 'guid-typescript';
import  "jquery-sparkline";

export class ActionMultiDevice extends DeviceBase implements IDevice {
    private sensors: ActionMultiSensor[];

    constructor(title: string, sensors: ActionMultiSensor[], height: number) {
        super({
            content: new ActionMultiDeviceContent({
                formatter: (text: string) => { return text }
            } as IDeviceContentOptions, sensors, (sensor: string, state: number) => { this.stateChange(sensor, state); }),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions),
        } as IDeviceOptions, height);
        this.sensors = sensors;
    }
    
    public getDefinition(): any {
        let definition = {};
        this.sensors.forEach(element => {
            definition[element.sensor] = { stats: false };
            if (element.sensor1 !== undefined) {
                definition[element.sensor1] = { stats: false };
            }
            if (element.sensor2 !== undefined) {
                definition[element.sensor2] = { stats: false };
            }
        });
        return definition;
    }

    public update(data: any) {
        this.options.content.update(data);
    }

    public stateChange(sensor: string, state: number) {
        this.changeValue(sensor, state);
    }
}

class ActionMultiDeviceContent implements IDeviceContent {
    private uid: string;
    private sensors: ActionMultiSensor[];
    private rows: ActionMultiDeviceContentRow[];

    constructor(options: IDeviceContentOptions, sensors: ActionMultiSensor[], stateChange: (sensor: string, state: number) => void) {
        this.uid = Guid.create().toString();
        this.rows = [];
        this.sensors = sensors;

        this.sensors.forEach((el) => {
            let arr = [ el.sensor ];
            if (el.sensor1 !== undefined) {
                arr.push(el.sensor1);
            }
            if (el.sensor2 !== undefined) {
                arr.push(el.sensor2);
            }
            let component = undefined;
            if (el.type === ActionMultiSensorType.Buttons) {
                component = new ButtonsActionComponent(arr, stateChange);
            } else if (el.type === ActionMultiSensorType.Preview) {
                component = new PreviewRowComponent(arr,  (text: string) => { return text + el.unit});
            } else if (el.type === ActionMultiSensorType.Heater) {
                component = new HeaterRowComponent(arr,  (text: string) => { return text + "°C "});
            } else if (el.type === ActionMultiSensorType.PreviewOnOffControl) {
                component = new PreviewOnOffRowComponent(arr[0]);
            } else {
                
            }
            if (component !== undefined) {
                this.rows.push({ title: el.title, component: component });
            }
        });
    }

    public render(): string {
        let content = `<div id="` + this.uid + `" class="" style="width: 100%; height: 100%;">`;
        this.rows.forEach(element => {
            content += this.generateRow(element.title, element.component);
        });
        
        content += `
                
        </div>`;
        return content;
    }

    private generateRow(title: string, component: IActionComponent): string {
        let content : string = `
        <div class="row" style="">
            <div class="col-6" section="0" section-value="0">
                <h6 class="" style="">
                    ` + title + `
                </h6>
            </div>`;
        content += `
            <div class="col-6" section="0" section-value="0">
                `;
        content += component.render();
        content += `
            </div>
        </div>`;
        return content
    }

    public update(data: any) {
        this.rows.forEach(el => {
            el.component.update(data);
        });
    }

    public bind() {
        this.rows.forEach(el => {
            el.component.bind();
        });
    }

    public unbind() {

    }
}