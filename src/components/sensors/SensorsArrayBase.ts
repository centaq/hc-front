
import { DeviceBase } from '../devices/DeviceBase';
import { IDeviceOptions, IDeviceContent, DefaultDeviceHeader } from '../../interfaces/IDevice';
import { HorizontalLayout, ILayout } from '../../interfaces/ILayouts';
import { Guid } from 'guid-typescript';

export class SensorsArrayBase extends DeviceBase {
    private sensors: ISensorsArray;

    constructor(title: string, icon: string, sensors: ISensorsArray, isFlag: boolean, formatter?: forrr) {
        super({
            content: new SensorsArrayContent(icon, sensors, isFlag, formatter),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            })
        } as IDeviceOptions);
        this.height = 'auto';
        this.sensors = sensors;
        this.classOverride = 'col-xs-12 col-sm-6 col-md-4';
    }
    
    public getDefinition(): any {
        let definition = {};
        for(let sensor in this.sensors) {
            definition[sensor] = { stats: false };
        }
        return definition;
    }
}

interface forrr {
    (text: string): string;
}

class SensorsArrayContent implements IDeviceContent {
    private layout: ILayout;
    private sensors: ISensorsArray;
    private isFlag: boolean;
    private uid: string;
    private formatter?: forrr;
    
    constructor(icon: string, sensors: ISensorsArray, isFlag: boolean, formatter?: forrr) {
        this.layout = new HorizontalLayout(icon, "row");
        this.sensors = sensors;
        this.isFlag = isFlag;
        this.uid = Guid.create().toString();
        this.formatter = formatter;

        if (!isFlag && formatter == undefined) {
            throw Error("Incorrect parameters");
        }
    }

    public render(): string {
        let content = `
        <div class="row">
            <div class="col-xs-12 col-md-12 " id="` + this.uid + `" >
                <div class="static-table-list">
                    <table class="table">
                        <tbody>`;
        for(let index in this.sensors) {
            var sensor = this.sensors[index];
            content += `
                <tr>
                    <td>` + sensor + `</td>
                    <td sensor="cell_` + index + `">`;
            if (this.isFlag) {
                content += `<span class='fa big-icon fas fa-burn align-middle active-icon'></span>`;
            } else {
                content += `<div class="centered"><span> ` + (<forrr>this.formatter)('-') + `</span></div> `;;
            }
            content += `</td></tr>`;
        }
        content += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`;
        return this.layout.render(content);
    }

    public update(data: any) {
        for(let sensor in data) {
            const rec = data[sensor];
            const el = $("#" + this.uid).find("[sensor='cell_" + sensor + "'] span");
            if (this.isFlag) {
                if (rec['data'] > 50) { //TODO
                    el.addClass('active-icon');
                } else {
                    el.removeClass('active-icon');
                }
            } else {
                el.text((<forrr>this.formatter)(rec['data']));
            }
        }
    }
    
    public bind() {
    }

    public unbind() {
    }
}

export interface ISensorsArray {
    [sensor:string]: string;
}