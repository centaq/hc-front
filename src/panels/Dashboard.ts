import { TemperatureSensor } from '../components/sensors/TemperatureSensor';
import { IMainPanel } from '../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';
import { AlarmDevice } from '../components/devices/AlarmDevice';
import { RoomsTemperatureDevice } from '../components/devices/RoomsTemperatureDevice';
import { ActionMultiDevice } from '../components/devices/ActionMultiDevice';
import { ActionDefinablePartType, ActionMultiSensorType } from '../interfaces/IDevice';
import { LightDelayDevice } from '../components/devices/LightDelayDevice';
import { SelectableDeviceBase } from '../components/devices/SelectableDeviceBase';
import { FormatterHelper } from '../helpers/FormatterHelper';
import { LightLevelSensor } from '../components/sensors/LightLevelSensor';
import { OvercurrentPreviewDevice } from '../components/devices/OvercurrentPreviewDevice';

export class Dashboard extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
                new TemperatureSensor('Temperatura zewnętrzna', "0.15.1"),
                new LightLevelSensor('Poziom światła', "0.15.2"),
                new ActionMultiDevice("Woda", [
                    { title: "Ciśnienie", sensor: "10.0.1" , sensor1: "10.0.4", type: ActionMultiSensorType.PreviewValueOnOff, unit: "bar" }, 
                    { title: "Zawór wody", sensor: "10.0.2", type: ActionMultiSensorType.Buttons },
                    { title: "Zasilanie pompy", sensor: "10.0.3", type: ActionMultiSensorType.Buttons }
                ], 150),
                new ActionMultiDevice("Podlewanie", [
                    { title: "Podlewanie włączone", parts: [
                        { sensor: "0.1.0", type: ActionDefinablePartType.Value},
                        { sensor: "0.1.103", type: ActionDefinablePartType.ActiveDot},
                    ], type: ActionMultiSensorType.Definable }, 
                    { title: "Świerki", sensor: "0.1.1", sensor1: "0.1.101", type: ActionMultiSensorType.Buttons },
                    { title: "Ogródek", sensor: "0.1.2", sensor1: "0.1.102", type: ActionMultiSensorType.Buttons },
                    { title: "Trawa", sensor: "0.1.3", sensor1: "0.1.103", type: ActionMultiSensorType.Buttons },
                    { title: "Plac zabaw", sensor: "0.1.4", sensor1: "0.1.104", type: ActionMultiSensorType.Buttons }
                ], 180),
                new OvercurrentPreviewDevice("Bezpieczniki", [
                    { code: "PP", title: "Przeciwprzepięciówka", sensor: "10.30.0" },
                    { code: "R1", title: "Trzyfazowe", sensor: "10.30.1" },
                    { code: "S1", title: "Pompa ciepła", sensor: "10.30.2" },
                    { code: "S5", title: "Rozdzielnica", sensor: "10.30.3" },
                    { code: "R2", title: "Ośw. garaż", sensor: "10.30.4" },
                    { code: "R3", title: "G. poddasze", sensor: "10.30.5" },
                    { code: "R4", title: "Pralnia i łaz", sensor: "10.30.6" },
                    { code: "R5", title: "Studnia i brama", sensor: "10.30.7" },
                    { code: "S25", title: "Studni", sensor: "10.30.8" },
                    { code: "S26", title: "Brama", sensor: "10.30.9" },
                    { code: "R6", title: "Rekuperator", sensor: "10.30.10" },
                    { code: "R7", title: "Altana, gniazdka", sensor: "10.30.11" },
                    { code: "R8", title: "Ogrzewanie", sensor: "10.30.12" },
                    { code: "S32", title: "Rozdzielacze", sensor: "10.30.13" },
                    { code: "S33", title: "Kocioł", sensor: "10.30.14" },
                    { code: "S34", title: "Pompy", sensor: "10.30.15" },
                    { code: "S35", title: "Bojler", sensor: "10.30.16" },
                    { code: "R9", title: "Kuchnia", sensor: "10.30.17" },
                    { code: "S37", title: "Lodówka", sensor: "10.30.18" },
                    { code: "R10", title: "G. dół", sensor: "10.30.19" },
                    { code: "S43", title: "Teletechnika", sensor: "10.30.20" },
                    { code: "R11", title: "G. garaż", sensor: "10.30.21" }
                ], 340),
                new RoomsTemperatureDevice("Ostatni ruch", [
                    { title: "Parter", sensor: "10.11.0" },
                    { title: "Garaż", sensor: "10.11.1" },
                    { title: "Piętro", sensor: "10.11.2" },
                    { title: "Gospodarczy", sensor: "10.11.3" },
                    { title: "Zewnętrzne", sensor: "10.11.4" }
                ], 150, "", (text: any) => { return FormatterHelper.time(text); }),
                new ActionMultiDevice("Ogrzewanie", [
                    { title: "Stan kotła", sensor: "10.21.3", type: ActionMultiSensorType.Preview, unit: "", valueFormatter: FormatterHelper.heaterState},
                    { title: "Kocioł ON", sensor: "avg.cd.10.21.4", type: ActionMultiSensorType.Preview, unit: "%", valueFormatter: FormatterHelper.decimalToPercentage },
                    { title: "CO", sensor: "1.10.60", sensor1: "1.10.61", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "CWU", sensor: "1.10.62", sensor1: "1.10.63", sensor2: "1.10.70", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "Powrót", sensor: "1.10.64", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "Spaliny", sensor: "1.10.65", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "Opał", sensor: "10.21.2", type: ActionMultiSensorType.Preview, unit: "" },
                ], 210),
                new ActionMultiDevice("Ogrzewanie parter", [
                    { title: "Pompa", sensor: "10.21.0", sensor1: "avg.cd.10.21.0", type: ActionMultiSensorType.PreviewOnOffControl },
                    { title: "Wiatrołap", sensor: "1.1.1", sensor1: "10.20.6", sensor2: "c.10.20.0", sensor3: "avg.cd.10.20.6", type: ActionMultiSensorType.Heater },
                    { title: "Łazienka", sensor: "1.3.1", sensor1: "10.20.7", sensor2: "c.10.20.2", sensor3: "avg.cd.10.20.7", type: ActionMultiSensorType.Heater },
                    { title: "Gabinet", sensor: "1.7.1", sensor1: "10.20.4", sensor2: "c.10.20.5", sensor3: "avg.cd.10.20.4", type: ActionMultiSensorType.Heater },
                    { title: "Kuchnia", sensor: "1.6.1", sensor1: "10.20.3", sensor2: "c.10.20.4", sensor3: "avg.cd.10.20.3", type: ActionMultiSensorType.Heater },
                    { title: "Schody", sensor: "1.2.1", sensor1: "10.20.5", sensor2: "c.10.20.1", sensor3: "avg.cd.10.20.5", type: ActionMultiSensorType.Heater },
                    { title: "Jadalnia", sensor: "1.5.1", sensor1: "10.20.2", sensor2: "c.10.20.3", sensor3: "avg.cd.10.20.2", type: ActionMultiSensorType.Heater },
                    { title: "Salon (taras)", sensor: "1.4.1", sensor1: "10.20.1", sensor2: "c.10.20.6", sensor3: "avg.cd.10.20.1", type: ActionMultiSensorType.Heater },
                    { title: "Kominek", sensor: "1.4.2", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "Garaż", sensor: "1.8.1", sensor1: "10.20.8", sensor2: "c.10.20.7", sensor3: "avg.cd.10.20.8", type: ActionMultiSensorType.Heater },
                    { title: "Spiżarnia", sensor: "1.9.1", type: ActionMultiSensorType.Preview, unit: "°C" },
                    { title: "Kotłownia", sensor: "1.10.1", type: ActionMultiSensorType.Preview, unit: "°C" },
                ], 340),
                new ActionMultiDevice("Ogrzewanie piętro", [
                    { title: "Pompa", sensor: "10.21.1", sensor1: "avg.cd.10.21.1", type: ActionMultiSensorType.PreviewOnOffControl },
                    { title: "Korytarz", sensor: "2.1.1", sensor1: "10.20.15", sensor2: "c.10.20.8", sensor3: "avg.cd.10.20.15", type: ActionMultiSensorType.Heater },
                    { title: "Sypialnia", sensor: "2.2.1", sensor1: "10.20.16", sensor2: "c.10.20.9", sensor3: "avg.cd.10.20.16", type: ActionMultiSensorType.Heater },
                    { title: "Garderoba", sensor: "2.3.1", sensor1: "10.20.17", sensor2: "c.10.20.10", sensor3: "avg.cd.10.20.17", type: ActionMultiSensorType.Heater },
                    { title: "P1", sensor: "2.4.1", sensor1: "10.20.18", sensor2: "c.10.20.11", sensor3: "avg.cd.10.20.18", type: ActionMultiSensorType.Heater },
                    { title: "P2", sensor: "2.5.1", sensor1: "10.20.19", sensor2: "c.10.20.12", sensor3: "avg.cd.10.20.19", type: ActionMultiSensorType.Heater },
                    { title: "Łazienka", sensor: "2.6.1", sensor1: "10.20.20", sensor2: "c.10.20.13", sensor3: "avg.cd.10.20.20", type: ActionMultiSensorType.Heater },
                    { title: "Bawialnia", sensor: "2.7.1", sensor1: "10.20.21", sensor2: "c.10.20.14", sensor3: "avg.cd.10.20.21", type: ActionMultiSensorType.Heater },
                    { title: "Pralnia", sensor: "2.8.1", sensor1: "10.20.22", sensor2: "c.10.20.15", sensor3: "avg.cd.10.20.22", type: ActionMultiSensorType.Heater },
                    { title: "P3", sensor: "2.9.1", sensor1: "10.20.23", sensor2: "c.10.20.16", sensor3: "avg.cd.10.20.23", type: ActionMultiSensorType.Heater },
                    { title: "P4", sensor: "2.10.1", sensor1: "10.20.24", sensor2: "c.10.20.17", sensor3: "avg.cd.10.20.24", type: ActionMultiSensorType.Heater },
                    { title: "Strych", sensor: "3.1.1", type: ActionMultiSensorType.Preview, unit: "°C" },
                ], 340),
                new RoomsTemperatureDevice("Liczniki energii", [
                    { title: "Całkowita", sensor: "1.14.10", sensor1: "1.14.20" },
                    { title: "Studnia", sensor: "1.14.11", sensor1: "1.14.21" },
                    { title: "Kotłownia", sensor: "1.14.12", sensor1: "1.14.22" },
                    { title: "Szafa elektryczna", sensor: "1.14.13", sensor1: "1.14.23" },
                    { title: "Teletechnika", sensor: "1.14.14", sensor1: "1.14.24" },
                    { title: "Rekuperator", sensor: "1.14.15", sensor1: "1.14.25" },
                    { title: "Kuchnia", sensor: "1.14.16", sensor1: "1.14.26" },
                    { title: "Pralnia", sensor: "1.14.17", sensor1: "1.14.27" }
                ], 250, " kWh", (text: any) => { return text.toFixed(1); }),
                new SelectableDeviceBase("Selectable", ""),
                new LightDelayDevice("Światło nad garażem", "0.2.0", [15, 30, 60, 120], "0.2.100"),                
                new AlarmDevice("alarm"),
                new ActionMultiDevice("Świąteczne", [
                    { title: "Nad garażem", sensor: "100.0.0", type: ActionMultiSensorType.Buttons },
                    { title: "Choinka zew.", sensor: "100.0.1", type: ActionMultiSensorType.Buttons },
                    { title: "Choinka wew.", sensor: "100.0.2", type: ActionMultiSensorType.Buttons }
                ], 150),
        ]];
    }

}