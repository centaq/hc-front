
import { DeviceBase } from './DeviceBase';
import { IDeviceOptions, IDeviceContent, DefaultDeviceHeader, IDeviceHeaderOptions } from '../../interfaces/IDevice';
import { Guid } from 'guid-typescript';
import { StateQueue } from '../../state/StateQueue';
import { StateCmdEnum } from '../../state/StateCmdEnum';
//import { Guid } from 'guid-typescript';

export class AlarmDevice extends DeviceBase {

    constructor(title: string) {
        super({
            content: new AlarmDeviceContent((section: number, state: boolean) => { this.stateChange(section, state); }),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions, 250);
        //this.height = 'auto';
        //this.classOverride = 'col-xs-12 col-sm-6';
        this.center = true;
    }
    
    public getDefinition(): any {
        let definition = {};
        return definition;
    }

    public update(data: any) {
        this.options.content.update("");//data[""].data);
    }

    public stateChange(section : number, state: boolean) {
        console.log({section: section, state: state});
        //this.changeValue("" + section, state ? 1 : 0);
    }
}

class AlarmDeviceContent implements IDeviceContent {
    
    private uid: string;
    private stateChange: (section: number, state: boolean) => void;

    constructor(stateChange: (section: number, state: boolean) => void) {
        this.uid = Guid.create().toString();
        this.stateChange = stateChange;
    }

    public render(): string {
        let content = `
        
        <div id="` + this.uid + `" class="" style="width: 100%; height: 100%;">
            <div class="col-xs-12 col-md-12" style="top:30px;">
                <div class="row">
                    <div class="col-xs-12 col-md-12" section="0" section-value="0">
                        <h3 class="centered">
                            <span class='fa fa-big fa-lock-open device-icon align-middle'></span>
                            <span class="content-text"></span>
                        </h3>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-12" style="top:120px">
                <div class="" style="width: 100%;">
                    <div class="col-xs-4 col-md-4 " section="1" section-value="0">
                        <h3 class="centered">
                            <span class='fa fa-lock-open device-icon align-middle'></span>
                        </h3>
                    </div>
                    <div class="col-xs-4 col-md-4 " section="2" section-value="0">
                        <h3 class="centered">
                            <span class='fa fa-fw fa-lock-open device-icon align-middle'></span>
                        </h3>
                    </div>
                    <div class="col-xs-4 col-md-4 " section="3" section-value="0">
                        <h3 class="centered">
                            <span class='fa fa-lock-open device-icon align-middle'></span>
                        </h3>
                    </div>
                </div>
            </div>
        </div>`;
        return content;
    }

    public update(data: any) {
        return;
        for (var i = 0; i < 4; i++) {
            let section = $("#" + this.uid + " div[section=" + i + "]");
            let sectionIcon = section.find(".device-icon");
            section.attr("section-value", data[i]);
            
            sectionIcon.removeClass("fa-lock");
            sectionIcon.removeClass("fa-lock-open");
            sectionIcon.addClass(data[i] ? "fa-lock" : "fa-lock-open");

        }
    }
    
    public bind() {
        for (var i = 0; i < 4; i++) {
            $("#" + this.uid + " div[section=" + i + "]").click((e) => {
                console.log($(e.currentTarget));
                console.log("ad " + $(e.currentTarget).attr("section"));
                this.stateChange(i, $(e.currentTarget).attr("section-value") == "0");
                StateQueue.enqueue(StateCmdEnum.ShowPopup, {});
            });
        }
    }

    public unbind() {
    }
}