import { Pedido } from "./Pedido";

export interface Producto {
    id?: string | number;
    name?: string;
    id_producto?: number;
    talla?: string;
    descripcion?: string;
    categoria?: string;
    categoria2?: string;
    sexo?: boolean;
    precio?: number;
    imagene1?: string | Text;
    imagene2?: string | Text;
    imagene3?: string | Text;
    Uds?:number;
    Pedido?: Pedido;
}
