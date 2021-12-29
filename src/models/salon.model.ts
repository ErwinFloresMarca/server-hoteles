import {belongsTo, model, property} from '@loopback/repository';
import {
  EstadoAmbiente,
  EstadoAmbienteWithRelations,
} from './estado-ambiente.model';
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

  constructor(data?: Partial<Salon>) {
    super(data);
  }
}

export interface SalonRelations {
  // describe navigational properties here
  estado?: EstadoAmbienteWithRelations;
}

export type SalonWithRelations = Salon & SalonRelations;
