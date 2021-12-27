import {model, property, hasMany} from '@loopback/repository';
import {TimeStamp} from '.';
import {Habitacion} from './habitacion.model';

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
}

export type CategoriaWithRelations = Categoria & CategoriaRelations;
