import {model, property} from '@loopback/repository';
import {TimeStamp} from '.';

@model()
export class EstadoAmbiente extends TimeStamp {
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


  constructor(data?: Partial<EstadoAmbiente>) {
    super(data);
  }
}

export interface EstadoAmbienteRelations {
  // describe navigational properties here
}

export type EstadoAmbienteWithRelations = EstadoAmbiente & EstadoAmbienteRelations;
