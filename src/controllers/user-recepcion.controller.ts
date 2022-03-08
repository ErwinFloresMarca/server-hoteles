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
  Recepcion,
} from '../models';
import {UserRepository} from '../repositories';

export class UserRecepcionController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Array of User has many Recepcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recepcion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Recepcion>,
  ): Promise<Recepcion[]> {
    return this.userRepository.recepciones(id).find(filter);
  }

  @post('/users/{id}/recepcions', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recepcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {
            title: 'NewRecepcionInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) recepcion: Omit<Recepcion, 'id'>,
  ): Promise<Recepcion> {
    return this.userRepository.recepciones(id).create(recepcion);
  }

  @patch('/users/{id}/recepcions', {
    responses: {
      '200': {
        description: 'User.Recepcion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {partial: true}),
        },
      },
    })
    recepcion: Partial<Recepcion>,
    @param.query.object('where', getWhereSchemaFor(Recepcion)) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.userRepository.recepciones(id).patch(recepcion, where);
  }

  @del('/users/{id}/recepcions', {
    responses: {
      '200': {
        description: 'User.Recepcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recepcion)) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.userRepository.recepciones(id).delete(where);
  }
}
