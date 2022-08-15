
import { IComponent } from "../interfaces/IComponent";

export abstract class ComponentBase implements IComponent {
    protected components: IComponent[] = [];

    constructor() {
    }

    public render(): string {
        throw new Error();
    }

    public bind() {

    }
}