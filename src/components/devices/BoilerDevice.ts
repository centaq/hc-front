
import { DeviceBase } from './DeviceBase';
import { IDeviceOptions, IDeviceContent, DefaultDeviceHeader, IDeviceHeaderOptions } from '../../interfaces/IDevice';
import { HorizontalLayout, ILayout } from '../../interfaces/ILayouts';
//import { Guid } from 'guid-typescript';

export class BoilerDevice extends DeviceBase {

    constructor(title: string, icon: string, formatter?: forrr) {
        super({
            content: new BiolerDeviceContent(icon, formatter),
            header: new DefaultDeviceHeader({
                title: title,
                collapsable: false,
                buttons: []
            } as IDeviceHeaderOptions)
        } as IDeviceOptions);
        this.height = 'auto';
        this.classOverride = 'col-xs-12 col-sm-6';
    }
    
    public getDefinition(): any {
        let definition = {};
        return definition;
    }
}

interface forrr {
    (text: string): string;
}

class BiolerDeviceContent implements IDeviceContent {
    private layout: ILayout;
    private formatter?: forrr;
    
    constructor(icon: string, formatter?: forrr) {
        this.layout = new HorizontalLayout(icon, "row");
        this.formatter = formatter;

        
    }

    public render(): string {
        let content = `
        <div class="row">
            <div class="col-xs-3 col-md-3 " >
                <h3 class="centered">
                    <span class="content-text">` + (<forrr>this.formatter)('-') + `</span>
                </h3>
            </div>
            <div class="col-xs-3 col-md-3 " >
                <h3 class="centered">
                    <span class="content-text">` + (<forrr>this.formatter)('-') + `</span>
                </h3>
            </div>
            <div class="col-xs-3 col-md-3 " >
                <h3 class="centered">
                    <span class="content-text">` + (<forrr>this.formatter)('-') + `</span>
                </h3>
            </div>
            <div class="col-xs-3 col-md-3 " >
                <h3 class="centered">
                    <span class="content-text">` + (<forrr>this.formatter)('-') + `</span>
                </h3>
            </div>
        </div>`;
        return this.layout.render(content);
    }

    public update(data: any) {
    }
    
    public bind() {
    }

    public unbind() {
    }
}