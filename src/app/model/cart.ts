import { Cliente } from "./Cliente";
import { Producto } from "./Producto";

export interface cart {
    id_cliente?: string | number;
    productos?: Producto[];

  
}