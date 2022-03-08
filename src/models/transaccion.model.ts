import {belongsTo, Entity, model, property} from '@loopback/repository';
import {CajaChica, CajaChicaWithRelations} from './caja-chica.model';
import {MovimientoWithRelations} from './movimiento.model';
import {Recepcion, RecepcionWithRelations} from './recepcion.model';
import {User, UserWithRelations} from './user.model';

@model()
export class Transaccion extends Entity {
  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaCreacion: string;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Recepcion)
  recepcionId: string;

  @belongsTo(() => CajaChica)
  cajaChicaId: string;

  constructor(data?: Partial<Transaccion>) {
    super(data);
  }
}

export interface TransaccionRelations {
  // describe navigational properties here
  user?: UserWithRelations;
  recepcion?: RecepcionWithRelations;
  cajaChica?: CajaChicaWithRelations;
  movimiento?: MovimientoWithRelations;
}

export type TransaccionWithRelations = Transaccion & TransaccionRelations;
