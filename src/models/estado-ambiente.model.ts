import {hasMany, model, property} from '@loopback/repository';
import {SalonWithRelations} from '.';
import {Habitacion, HabitacionWithRelations} from './habitacion.model';
import {Salon} from './salon.model';
import {TimeStamp} from './time-stamp.model';

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

  @hasMany(() => Habitacion, {keyTo: 'estadoId'})
  habitaciones: Habitacion[];

  @hasMany(() => Salon, {keyTo: 'estadoId'})
  salones: Salon[];

  constructor(data?: Partial<EstadoAmbiente>) {
    super(data);
  }
}

export interface EstadoAmbienteRelations {
  // describe navigational properties here
  habitaciones?: HabitacionWithRelations[];
  salones?: SalonWithRelations[];
}

export type EstadoAmbienteWithRelations = EstadoAmbiente &
  EstadoAmbienteRelations;
