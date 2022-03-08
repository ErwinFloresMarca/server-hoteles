import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {Detalle, DetalleWithRelations} from './detalle.model';
import {Recepcion, RecepcionWithRelations} from './recepcion.model';
import {TimeStamp} from './time-stamp.model';
import {Transaccion, TransaccionWithRelations} from './transaccion.model';
import {User, UserWithRelations} from './user.model';

@model()
export class Movimiento extends TimeStamp {
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
  total: number;

  @property({
    type: 'string',
    required: true,
  })
  tipoMovimiento: string;

  @hasMany(() => Transaccion)
  transacciones: Transaccion[];

  @belongsTo(() => Recepcion)
  recepcionId: string;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Detalle)
  detalles: Detalle[];

  constructor(data?: Partial<Movimiento>) {
    super(data);
  }
}

export interface MovimientoRelations {
  // describe navigational properties here
  transacciones?: TransaccionWithRelations[];
  recepcion?: RecepcionWithRelations;
  user?: UserWithRelations;
  detalles?: DetalleWithRelations[];
}

export type MovimientoWithRelations = Movimiento & MovimientoRelations;
