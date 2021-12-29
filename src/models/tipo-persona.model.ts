import {model, property} from '@loopback/repository';
import {TimeStamp} from '.';

@model()
export class TipoPersona extends TimeStamp {
  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<TipoPersona>) {
    super(data);
  }
}

export interface TipoPersonaRelations {
  // describe navigational properties here
}

export type TipoPersonaWithRelations = TipoPersona & TipoPersonaRelations;
