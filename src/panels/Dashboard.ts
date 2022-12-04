import { TemperatureSensor } from '../components/sensors/TemperatureSensor';
import { IMainPanel } from '../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';
import { LightDevice } from '../components/devices/LightDevice';
import { LightFluentDevice } from '../components/devices/LightFluentDevice';
import { GarageDoorDevice } from '../components/devices/GarageDoorDevice';
import { LightLevelSensor } from '../components/sensors/LightLevelSensor';
import { SmokeLevelSensor } from '../components/sensors/SmokeLevelSensor';
import { TestTemperatureSensor } from '../components/sensors/TestTemperatureSensor';
import { SelectableDeviceBase } from '../components/devices/SelectableDeviceBase';
import { AlarmDevice } from '../components/devices/AlarmDevice';
import { RoomsTemperatureDevice } from '../components/devices/RoomsTemperatureDevice';
import { ActionMultiDevice } from '../components/devices/ActionMultiDevice';
import { ActionMultiSensorType } from '../interfaces/IDevice';
import { LightDelayDevice } from '../components/devices/LightDelayDevice';

export class Dashboard extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
                new AlarmDevice("alarm"),
                new LightDelayDevice("Światło nad garażem", "0.2.0", [15, 30, 60, 120], "0.2.100"),
                new ActionMultiDevice("Woda", [
                    { title: "Ciśnienie", sensor: "10.0.1" , type: ActionMultiSensorType.Preview, unit: "bar" }, 
                    { title: "Zawór wody", sensor: "10.0.2", type: ActionMultiSensorType.Buttons },
                    { title: "Zasilanie pompy", sensor: "10.0.3", type: ActionMultiSensorType.Buttons }
                ], 150),
                new ActionMultiDevice("Świąteczne", [
                    { title: "Nad garażem", sensor: "100.0.0", type: ActionMultiSensorType.Buttons },
                    { title: "Choinka zew.", sensor: "100.0.1", type: ActionMultiSensorType.Buttons },
                    { title: "Choinka wew.", sensor: "100.0.2", type: ActionMultiSensorType.Buttons }
                ], 150),
                new ActionMultiDevice("Podlewanie", [
                    { title: "Podlewanie włączone", sensor: "0.1.0" , type: ActionMultiSensorType.Buttons }, 
                    { title: "Trawa", sensor: "0.1.1", sensor1: "0.1.101", type: ActionMultiSensorType.Buttons },
                    { title: "Świerki", sensor: "0.1.2", sensor1: "0.1.102", type: ActionMultiSensorType.Buttons }
                ], 150),
                new ActionMultiDevice("Bezpieczniki", [
                    { title: "Pompy", sensor: "10.30.0", type: ActionMultiSensorType.PreviewOnOffControl },
                    { title: "Elektrozawory", sensor: "10.30.1", type: ActionMultiSensorType.PreviewOnOffControl }
                ], 150),
                new ActionMultiDevice("Ogrzewanie parter", [
                    { title: "Pompa", sensor: "10.21.0", type: ActionMultiSensorType.PreviewOnOffControl },
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
                    { title: "Pompa", sensor: "10.21.1", type: ActionMultiSensorType.PreviewOnOffControl },
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
                new RoomsTemperatureDevice("Temperatura parter", [
                    { title: "Wiatrołap", sensor: "1.1.1" },
                    { title: "Gabinet", sensor: "1.7.1" },
                    { title: "Kuchnia", sensor: "1.6.1" },
                    { title: "Schody", sensor: "1.2.1" },
                    { title: "Taras Salon", sensor: "1.4.1" },
                    { title: "Kominek", sensor: "1.4.2" },
                    { title: "Garaż", sensor: "1.8.1" },
                    { title: "Spiżarnia", sensor: "1.9.1" },
                    { title: "Kotłownia", sensor: "1.10.1" },
                ], 260, "°C"),
                new RoomsTemperatureDevice("Temperatura piętro", [
                    { title: "Korytarz", sensor: "2.1.1" },
                    { title: "Sypialnia", sensor: "2.2.1" },
                    { title: "Garderoba", sensor: "2.3.1" },
                    { title: "P1", sensor: "2.4.1" },
                    { title: "P2", sensor: "2.5.1" },
                    { title: "Łazienka", sensor: "2.6.1" },
                    { title: "Bawialnia", sensor: "2.7.1" },
                    { title: "Pralnia", sensor: "2.8.1" },
                    { title: "P3", sensor: "2.9.1" },
                    { title: "P4", sensor: "2.10.1" },
                    { title: "Strych", sensor: "3.1.1" },
                ], 300, "°C"),
                new RoomsTemperatureDevice("Liczniki energii", [
                    { title: "Całkowita", sensor: "1.14.10", sensor1: "1.14.15" },
                    { title: "Studnia", sensor: "1.14.11", sensor1: "1.14.16" },
                    { title: "Kotłownia", sensor: "1.14.12", sensor1: "1.14.17" },
                    { title: "Szafa elektryczna", sensor: "1.14.13", sensor1: "1.14.18" },
                    { title: "Teletechnika", sensor: "1.14.14", sensor1: "1.14.19" }
                ], 150, " kWh"),
                new RoomsTemperatureDevice("Ostatni ruch", [
                    { title: "Parter", sensor: "10.11.0" },
                    { title: "Garaż", sensor: "10.11.1" },
                    { title: "Piętro", sensor: "10.11.2" },
                    { title: "Gospodarczy", sensor: "10.11.3" },
                    { title: "Zewnętrzne", sensor: "10.11.4" }
                ], 150, " s"),
                new TemperatureSensor('Temperatura zewnętrzna', "0.15.1"),
                new TemperatureSensor('Temperatura biuro', "2.15.1"),
                new TestTemperatureSensor("Temperatura w pokoju"),
                //new BoilerTemperatureSensor('Temperatura pieca', "1.15.1"),
                new TemperatureSensor('Temperatura szafy', "2.14.1"),
                new LightLevelSensor('Poziom światła', "0.15.2"),
                new GarageDoorDevice("title", "33.33"),
                new LightDevice("Światło biuro", "2.15.4"),
                new LightDevice("Światło małe sypialnia", "2.16.4"),
                new LightDevice("Światło duże sypialnia", "2.16.5"),
                new SmokeLevelSensor("Czujnik dymu szafy", "2.14.2"),
                new LightFluentDevice("Światło", "2.16.6"),
                new SelectableDeviceBase("Selectable", "")
                //new SmokeLevelSensor("Czujnik dymu kotłownia", "2.14.2")
        ]];
    }

}