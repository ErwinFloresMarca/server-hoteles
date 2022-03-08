import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {Habitacion, HabitacionWithRelations} from './habitacion.model';
import {Movimiento, MovimientoWithRelations} from './movimiento.model';
import {Persona, PersonaWithRelations} from './persona.model';
import {Salon, SalonWithRelations} from './salon.model';
import {Transaccion, TransaccionWithRelations} from './transaccion.model';
import {User, UserWithRelations} from './user.model';

@model()
export class Recepcion extends Entity {
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
  clienteId: string;

  @property({
    type: 'string',
  })
  fechaEntrada?: string;

  @property({
    type: 'string',
  })
  fechaSalida?: string;

  @property({
    type: 'string',
  })
  fechaSalidaConfirmacion?: string;

  @property({
    type: 'number',
    required: true,
  })
  precioInicial: number;

  @property({
    type: 'number',
  })
  adelanto?: number;

  @property({
    type: 'number',
  })
  precioRestante?: number;

  @property({
    type: 'number',
    required: true,
  })
  totalPago: number;

  @property({
    type: 'number',
  })
  costoPenalidad?: number;

  @property({
    type: 'string',
  })
  observacion?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Habitacion)
  habitacionId: string;

  @belongsTo(() => Salon)
  salonId: string;

  @belongsTo(() => Persona)
  personaId: string;

  @belongsTo(() => User)
  userId: string;

  @hasMany(() => Transaccion)
  transacciones: Transaccion[];

  @hasMany(() => Movimiento)
  movimientos: Movimiento[];

  constructor(data?: Partial<Recepcion>) {
    super(data);
  }
}

export interface RecepcionRelations {
  habitacion?: HabitacionWithRelations;
  salon?: SalonWithRelations;
  persona?: PersonaWithRelations;
  user?: UserWithRelations;
  transacciones?: TransaccionWithRelations[];
  movimientos?: MovimientoWithRelations[];
}

export type RecepcionWithRelations = Recepcion & RecepcionRelations;
