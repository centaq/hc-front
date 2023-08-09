import { IDeviceOptions, IDevice } from "src/interfaces/IDevice";
import { Guid } from "guid-typescript"
import { StateQueue } from "../../state/StateQueue";
import { StateCmdEnum } from "../../state/StateCmdEnum";
import { IDeviceStateChange } from "src/data/Retriever";

export abstract class DeviceBase implements IDevice {
    protected uid: string;
    protected options: IDeviceOptions;
    protected classOverride: string;
    protected height: string;
    protected center: boolean = false;
    
    constructor(options: IDeviceOptions, height: number = 100) {
        this.uid = Guid.create().toString();
        this.options = options;
        this.height = height + 'px';
        this.classOverride = "col-xl-3 col-lg-4 col-md-4 col-sm-6";
    }

    public getUID(): string {
        return this.uid;
    }

    public render(): string {
        let content = `
        <div id="` + this.uid + `" class="` + this.classOverride + `">
            <div class="income-dashone-total shadow-reset nt-mg-b-30">
                <div class="device-component-title">`;
        content += this.options.header.render();
        content += `
                </div>
                <div class="device-component-content ` + (this.center ? "vcentered" : "") + `" style="height: ` + this.height.toString() + `;">`;
        content += this.options.content.render();
        content += `
                </div>
            </div>
        </div>`;
        return content;
    }

    public bind() {
        this.options.content.bind();
    }

    public unbind() {
        this.options.content.unbind();
    }

    public getDefinition(): any {
        throw Error('not implemented');
    }

    public update(data: any) {
        this.options.content.update(data);
    }

    //TODO to trzeba usunac ostatecznie, no ekstra ale czemu?
    public changeValue(sensor: string, cmd: number, value?: number) {
        StateQueue.enqueue(StateCmdEnum.DeviceStateChange, 
        {
            sensor: sensor,
            cmd: cmd,
            value: value
        } as IDeviceStateChange);
    }

    public changeValueWithType(type: string, sensor: string, cmd: number, value?: number) {
        StateQueue.enqueue(StateCmdEnum.DeviceStateChange, 
        {
            type: type,
            sensor: sensor,
            cmd: cmd,
            value: value
        } as IDeviceStateChange);
    }
}