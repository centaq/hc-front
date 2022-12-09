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
import { RoomsTemperatureDevice } from '../components/devices/RoomsTemperatureDevice';

export class Dashboard extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
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