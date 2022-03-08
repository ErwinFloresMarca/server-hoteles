import {hasMany, model, property} from '@loopback/repository';
import {Detalle, DetalleWithRelations} from './detalle.model';
import {TimeStamp} from './time-stamp.model';

@model()
export class Producto extends TimeStamp {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  detalle?: string;

  @property({
    type: 'number',
    required: true,
  })
  precioVenta: number;

  @property({
    type: 'number',
    required: true,
  })
  precioCompra: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @hasMany(() => Detalle)
  detalles: Detalle[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
  detalles?: DetalleWithRelations[];
}

export type ProductoWithRelations = Producto & ProductoRelations;
