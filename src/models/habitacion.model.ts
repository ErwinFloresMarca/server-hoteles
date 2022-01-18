import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categoria, CategoriaWithRelations} from './categoria.model';
import {
  EstadoAmbiente,
  EstadoAmbienteWithRelations,
} from './estado-ambiente.model';

@model()
export class Habitacion extends Entity {
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
    type: 'date',
    defaultFn: 'now',
    required: false,
  })
  fechaCreacion?: string;

  @belongsTo(() => Categoria)
  categoriaId: string;

  @belongsTo(() => EstadoAmbiente)
  estadoId: string;

  constructor(data?: Partial<Habitacion>) {
    super(data);
  }
}

export interface HabitacionRelations {
  // describe navigational properties here
  categoria?: CategoriaWithRelations;
  estado?: EstadoAmbienteWithRelations;
}

export type HabitacionWithRelations = Habitacion & HabitacionRelations;
