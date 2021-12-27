import {model, property} from '@loopback/repository';
import {TimeStamp} from '.';

@model()
export class Habitacion extends TimeStamp {
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

  @property({
    type: 'number',
    required: true,
  })
  piso: number;

  @property({
    type: 'string',
  })
  categoriaId?: string;

  constructor(data?: Partial<Habitacion>) {
    super(data);
  }
}

export interface HabitacionRelations {
  // describe navigational properties here
}

export type HabitacionWithRelations = Habitacion & HabitacionRelations;
