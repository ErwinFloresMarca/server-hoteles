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
  Movimiento,
} from '../models';
import {UserRepository} from '../repositories';

export class UserMovimientoController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/movimientos', {
    responses: {
      '200': {
        description: 'Array of User has many Movimiento',
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
    return this.userRepository.movimientos(id).find(filter);
  }

  @post('/users/{id}/movimientos', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Movimiento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {
            title: 'NewMovimientoInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) movimiento: Omit<Movimiento, 'id'>,
  ): Promise<Movimiento> {
    return this.userRepository.movimientos(id).create(movimiento);
  }

  @patch('/users/{id}/movimientos', {
    responses: {
      '200': {
        description: 'User.Movimiento PATCH success count',
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
    return this.userRepository.movimientos(id).patch(movimiento, where);
  }

  @del('/users/{id}/movimientos', {
    responses: {
      '200': {
        description: 'User.Movimiento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Movimiento)) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.userRepository.movimientos(id).delete(where);
  }
}
