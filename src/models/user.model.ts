import {hasMany, hasOne, model, property} from '@loopback/repository';
import {
  CuadernoDeNovedades,
  CuadernoDeNovedadesWithRelations,
} from './cuaderno-de-novedades.model';
import {TimeStamp} from './time-stamp.model';
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

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
  cuadernoDeNovedades: CuadernoDeNovedadesWithRelations[];
}

export type UserWithRelations = User & UserRelations;
