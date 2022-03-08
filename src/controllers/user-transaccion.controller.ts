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
  User,
  Transaccion,
} from '../models';
import {UserRepository} from '../repositories';

export class UserTransaccionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of User has many Transaccion',
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
    return this.userRepository.transacciones(id).find(filter);
  }

  @post('/users/{id}/transaccions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'id'>,
  ): Promise<Transaccion> {
    return this.userRepository.transacciones(id).create(transaccion);
  }

  @patch('/users/{id}/transaccions', {
    responses: {
      '200': {
        description: 'User.Transaccion PATCH success count',
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
    return this.userRepository.transacciones(id).patch(transaccion, where);
  }

  @del('/users/{id}/transaccions', {
    responses: {
      '200': {
        description: 'User.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.userRepository.transacciones(id).delete(where);
  }
}
