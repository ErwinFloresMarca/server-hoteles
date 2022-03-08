import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {Recepcion, RecepcionWithRelations} from './recepcion.model';
import {TimeStamp} from './time-stamp.model';
import {TipoPersona, TipoPersonaWithRelations} from './tipo-persona.model';

@model()
export class Persona extends TimeStamp {
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
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @belongsTo(() => TipoPersona)
  tipoPersonaId: string;

  @hasMany(() => Recepcion)
  recepciones: Recepcion[];

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
  tipoPersona?: TipoPersonaWithRelations;
  recepciones?: RecepcionWithRelations[];
}

export type PersonaWithRelations = Persona & PersonaRelations;
