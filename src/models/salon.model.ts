import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {
  EstadoAmbiente,
  EstadoAmbienteWithRelations,
} from './estado-ambiente.model';
import {Recepcion, RecepcionWithRelations} from './recepcion.model';
import {TimeStamp} from './time-stamp.model';

@model()
export class Salon extends TimeStamp {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  detalle: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @belongsTo(() => EstadoAmbiente)
  estadoId: string;

  @hasMany(() => Recepcion)
  recepciones: Recepcion[];

  constructor(data?: Partial<Salon>) {
    super(data);
  }
}

export interface SalonRelations {
  // describe navigational properties here
  estado?: EstadoAmbienteWithRelations;
  recepciones?: RecepcionWithRelations[];
}

export type SalonWithRelations = Salon & SalonRelations;
