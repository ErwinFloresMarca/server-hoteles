import {hasMany, model, property} from '@loopback/repository';
import {Persona, PersonaWithRelations} from './persona.model';
import {TimeStamp} from './time-stamp.model';

@model()
export class TipoPersona extends TimeStamp {
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
  descripcion: string;

  @hasMany(() => Persona)
  personas: Persona[];

  constructor(data?: Partial<TipoPersona>) {
    super(data);
  }
}

export interface TipoPersonaRelations {
  // describe navigational properties here
  personas: PersonaWithRelations[];
}

export type TipoPersonaWithRelations = TipoPersona & TipoPersonaRelations;
