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
  CajaChica,
  Transaccion,
} from '../models';
import {CajaChicaRepository} from '../repositories';

export class CajaChicaTransaccionController {
  constructor(
    @repository(CajaChicaRepository) protected cajaChicaRepository: CajaChicaRepository,
  ) { }

  @get('/caja-chicas/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of CajaChica has many Transaccion',
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
    return this.cajaChicaRepository.transacciones(id).find(filter);
  }

  @post('/caja-chicas/{id}/transaccions', {
    responses: {
      '200': {
        description: 'CajaChica model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CajaChica.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInCajaChica',
            exclude: ['id'],
            optional: ['cajaChicaId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'id'>,
  ): Promise<Transaccion> {
    return this.cajaChicaRepository.transacciones(id).create(transaccion);
  }

  @patch('/caja-chicas/{id}/transaccions', {
    responses: {
      '200': {
        description: 'CajaChica.Transaccion PATCH success count',
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
    return this.cajaChicaRepository.transacciones(id).patch(transaccion, where);
  }

  @del('/caja-chicas/{id}/transaccions', {
    responses: {
      '200': {
        description: 'CajaChica.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.cajaChicaRepository.transacciones(id).delete(where);
  }
}
