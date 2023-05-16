export interface Laptop {
    id: number;
    produttore: string;
    modello: string;
    dimensioneSchermo: number;
    modelloCPU:string;
}

export interface LaptopState {
    laptops: Laptop[]
}
