import {belongsTo, model, property} from '@loopback/repository';
import {TimeStamp} from './time-stamp.model';
import {User, UserWithRelations} from './user.model';

@model()
export class CuadernoDeNovedades extends TimeStamp {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  novedades: object[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<CuadernoDeNovedades>) {
    super(data);
  }
}

export interface CuadernoDeNovedadesRelations {
  // describe navigational properties here
  user: UserWithRelations;
}

export type CuadernoDeNovedadesWithRelations = CuadernoDeNovedades &
  CuadernoDeNovedadesRelations;
