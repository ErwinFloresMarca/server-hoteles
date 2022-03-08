import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Movimiento,
  Detalle,
} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoDetalleController {
  constructor(
    @repository(MovimientoRepository) protected movimientoRepository: MovimientoRepository,
  ) { }

  @get('/movimientos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Array of Movimiento has many Detalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detalle)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detalle>,
  ): Promise<Detalle[]> {
    return this.movimientoRepository.detalles(id).find(filter);
  }

  @post('/movimientos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Movimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detalle)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detalle, {
            title: 'NewDetalleInMovimiento',
            exclude: ['id'],
            optional: ['movimientoId']
          }),
        },
      },
    }) detalle: Omit<Detalle, 'id'>,
  ): Promise<Detalle> {
    return this.movimientoRepository.detalles(id).create(detalle);
  }

  @patch('/movimientos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Movimiento.Detalle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detalle, {partial: true}),
        },
      },
    })
    detalle: Partial<Detalle>,
    @param.query.object('where', getWhereSchemaFor(Detalle)) where?: Where<Detalle>,
  ): Promise<Count> {
    return this.movimientoRepository.detalles(id).patch(detalle, where);
  }

  @del('/movimientos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Movimiento.Detalle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detalle)) where?: Where<Detalle>,
  ): Promise<Count> {
    return this.movimientoRepository.detalles(id).delete(where);
  }
}
