import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Movimiento, MovimientoWithRelations} from './movimiento.model';
import {Producto, ProductoWithRelations} from './producto.model';

@model()
export class Detalle extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  precioUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  subTotal: number;

  @belongsTo(() => Movimiento)
  movimientoId: string;

  @belongsTo(() => Producto)
  productoId: string;

  constructor(data?: Partial<Detalle>) {
    super(data);
  }
}

export interface DetalleRelations {
  // describe navigational properties here
  movimiento?: MovimientoWithRelations;
  producto?: ProductoWithRelations;
}

export type DetalleWithRelations = Detalle & DetalleRelations;
