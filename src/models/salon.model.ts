import {model, property} from '@loopback/repository';
import {TimeStamp} from '.';

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


  constructor(data?: Partial<Salon>) {
    super(data);
  }
}

export interface SalonRelations {
  // describe navigational properties here
}

export type SalonWithRelations = Salon & SalonRelations;
