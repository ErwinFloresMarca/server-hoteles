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
  Transaccion,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionTransaccionController {
  constructor(
    @repository(RecepcionRepository) protected recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of Recepcion has many Transaccion',
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
    return this.recepcionRepository.transacciones(id).find(filter);
  }

  @post('/recepcions/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Recepcion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInRecepcion',
            exclude: ['id'],
            optional: ['recepcionId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'id'>,
  ): Promise<Transaccion> {
    return this.recepcionRepository.transacciones(id).create(transaccion);
  }

  @patch('/recepcions/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Recepcion.Transaccion PATCH success count',
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
    return this.recepcionRepository.transacciones(id).patch(transaccion, where);
  }

  @del('/recepcions/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Recepcion.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.recepcionRepository.transacciones(id).delete(where);
  }
}
