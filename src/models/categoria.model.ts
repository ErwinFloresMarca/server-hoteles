import {hasMany, model, property} from '@loopback/repository';
import {Habitacion, HabitacionWithRelations} from './habitacion.model';
import {TimeStamp} from './time-stamp.model';

@model()
export class Categoria extends TimeStamp {
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

  @hasMany(() => Habitacion)
  habitaciones: Habitacion[];

  constructor(data?: Partial<Categoria>) {
    super(data);
  }
}

export interface CategoriaRelations {
  // describe navigational properties here
  habitaciones?: HabitacionWithRelations[];
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
