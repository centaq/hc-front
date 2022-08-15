import { IMainPanel } from '../../interfaces/IMainPanel';
import { PanelBase } from './PanelBase';
import { BoilerTemperatureSensor } from '../devices/sensors/BoilerTemperatureSensor';
import { SmokeLevelSensor } from '../devices/sensors/SmokeLevelSensor';
import { WaterUsageSensor } from '../devices/sensors/WaterUsageSensor';
import { UnderfloorPumpGroundDevice } from '../devices/UnderfloorPumpGroundDevice';
import { UnderfloorPumpFloorDevice } from '../devices/UnderfloorPumpFloorDevice';
import { WaterPressureSensorsDevice } from '../devices/WaterPressureSensorsDevice';
import { FuelLevelSensor } from '../devices/sensors/FuelLevelSensor';
import { BoilerDevice } from '../devices/BoilerDevice';

export class BoilerRoom extends PanelBase implements IMainPanel {

    constructor() {
        super();
        this.devices = [ [
            new BoilerDevice("Kocioł", "fas fa-wind", (text: string) => { return text + "% %"; } )
        ],[
            new BoilerTemperatureSensor('Temperatura pieca', "1.10.1"),
            new FuelLevelSensor("Poziom opału", "1.10.4"),
            new SmokeLevelSensor("Czujnik dymu kotłownia", "1.10.2"),
            new WaterUsageSensor("Licznik wody", "1.10.3")
        ],[
            new UnderfloorPumpGroundDevice("Pompy podłogówki parter"),
            new UnderfloorPumpFloorDevice("Pompy podłogówki piętro"),
            new WaterPressureSensorsDevice("Czujniki ciśnienia")
        ]];
    }

}