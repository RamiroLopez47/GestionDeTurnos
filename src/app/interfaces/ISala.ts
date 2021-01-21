import { IReserva } from './IReserva';

export interface ISala {
    id          ?: number,
    status      ?:boolean,
    nombreDeSala : String,
    reservas     : IReserva[],
    
}
