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
  CajaChica,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCajaChicaController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/caja-chicas', {
    responses: {
      '200': {
        description: 'Array of User has many CajaChica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CajaChica)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CajaChica>,
  ): Promise<CajaChica[]> {
    return this.userRepository.cajaChicas(id).find(filter);
  }

  @post('/users/{id}/caja-chicas', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(CajaChica)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaChica, {
            title: 'NewCajaChicaInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) cajaChica: Omit<CajaChica, 'id'>,
  ): Promise<CajaChica> {
    return this.userRepository.cajaChicas(id).create(cajaChica);
  }

  @patch('/users/{id}/caja-chicas', {
    responses: {
      '200': {
        description: 'User.CajaChica PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaChica, {partial: true}),
        },
      },
    })
    cajaChica: Partial<CajaChica>,
    @param.query.object('where', getWhereSchemaFor(CajaChica)) where?: Where<CajaChica>,
  ): Promise<Count> {
    return this.userRepository.cajaChicas(id).patch(cajaChica, where);
  }

  @del('/users/{id}/caja-chicas', {
    responses: {
      '200': {
        description: 'User.CajaChica DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CajaChica)) where?: Where<CajaChica>,
  ): Promise<Count> {
    return this.userRepository.cajaChicas(id).delete(where);
  }
}
