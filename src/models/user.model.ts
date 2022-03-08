import {hasMany, hasOne, model, property} from '@loopback/repository';
import {CajaChica, CajaChicaWithRelations} from './caja-chica.model';
import {
  CuadernoDeNovedades,
  CuadernoDeNovedadesWithRelations,
} from './cuaderno-de-novedades.model';
import {Movimiento, MovimientoWithRelations} from './movimiento.model';
import {Recepcion, RecepcionWithRelations} from './recepcion.model';
import {TimeStamp} from './time-stamp.model';
import {Transaccion, TransaccionWithRelations} from './transaccion.model';
import {UserCredentials} from './user-credentials.model';

@model()
export class User extends TimeStamp {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  nombreUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCompleto: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email: string;

  @property({
    type: 'string',
  })
  avatar?: string;

  @property({
    type: 'string',
  })
  role: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @hasMany(() => CuadernoDeNovedades)
  cuadernoDeNovedades: CuadernoDeNovedades[];

  @hasMany(() => Recepcion)
  recepciones: Recepcion[];

  @hasMany(() => Transaccion)
  transacciones: Transaccion[];

  @hasMany(() => CajaChica)
  cajaChicas: CajaChica[];

  @hasMany(() => Movimiento)
  movimientos: Movimiento[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  cuadernoDeNovedades?: CuadernoDeNovedadesWithRelations[];
  recepciones?: RecepcionWithRelations[];
  transacciones?: TransaccionWithRelations[];
  cajaChicas?: CajaChicaWithRelations[];
  movimientos?: MovimientoWithRelations[];
}

export type UserWithRelations = User & UserRelations;
