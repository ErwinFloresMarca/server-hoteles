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
  Recepcion,
  Movimiento,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionMovimientoController {
  constructor(
    @repository(RecepcionRepository) protected recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/movimientos', {
    responses: {
      '200': {
        description: 'Array of Recepcion has many Movimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movimiento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Movimiento>,
  ): Promise<Movimiento[]> {
    return this.recepcionRepository.movimientos(id).find(filter);
  }

  @post('/recepcions/{id}/movimientos', {
    responses: {
      '200': {
        description: 'Recepcion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movimiento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {
            title: 'NewMovimientoInRecepcion',
            exclude: ['id'],
            optional: ['recepcionId']
          }),
        },
      },
    }) movimiento: Omit<Movimiento, 'id'>,
  ): Promise<Movimiento> {
    return this.recepcionRepository.movimientos(id).create(movimiento);
  }

  @patch('/recepcions/{id}/movimientos', {
    responses: {
      '200': {
        description: 'Recepcion.Movimiento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {partial: true}),
        },
      },
    })
    movimiento: Partial<Movimiento>,
    @param.query.object('where', getWhereSchemaFor(Movimiento)) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.recepcionRepository.movimientos(id).patch(movimiento, where);
  }

  @del('/recepcions/{id}/movimientos', {
    responses: {
      '200': {
        description: 'Recepcion.Movimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Movimiento)) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.recepcionRepository.movimientos(id).delete(where);
  }
}
