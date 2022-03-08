import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {TimeStamp} from './time-stamp.model';
import {Transaccion, TransaccionWithRelations} from './transaccion.model';
import {User, UserWithRelations} from './user.model';

@model()
export class CajaChica extends TimeStamp {
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
  montoInicio: number;

  @property({
    type: 'number',
  })
  montoFinal?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
  })
  fechaFinal?: string;

  @hasMany(() => Transaccion)
  transacciones: Transaccion[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<CajaChica>) {
    super(data);
  }
}

export interface CajaChicaRelations {
  // describe navigational properties here
  transacciones?: TransaccionWithRelations[];
  user?: UserWithRelations;
}

export type CajaChicaWithRelations = CajaChica & CajaChicaRelations;
