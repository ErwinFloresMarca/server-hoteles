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
  Transaccion,
} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoTransaccionController {
  constructor(
    @repository(MovimientoRepository) protected movimientoRepository: MovimientoRepository,
  ) { }

  @get('/movimientos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of Movimiento has many Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Transaccion>,
  ): Promise<Transaccion[]> {
    return this.movimientoRepository.transacciones(id).find(filter);
  }

  @post('/movimientos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Movimiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Movimiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInMovimiento',
            exclude: ['id'],
            optional: ['movimientoId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'id'>,
  ): Promise<Transaccion> {
    return this.movimientoRepository.transacciones(id).create(transaccion);
  }

  @patch('/movimientos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Movimiento.Transaccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {partial: true}),
        },
      },
    })
    transaccion: Partial<Transaccion>,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.movimientoRepository.transacciones(id).patch(transaccion, where);
  }

  @del('/movimientos/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Movimiento.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.movimientoRepository.transacciones(id).delete(where);
  }
}
