import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {EstadoAmbiente, Salon} from '../models';
import {SalonRepository} from '../repositories';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin'],
  voters: [basicAuthorization],
})
export class SalonController {
  constructor(
    @repository(SalonRepository)
    public salonRepository: SalonRepository,
  ) {}

  @post('/salones')
  @response(200, {
    description: 'Salon model instance',
    content: {'application/json': {schema: getModelSchemaRef(Salon)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {
            title: 'NewSalon',
            exclude: ['id'],
          }),
        },
      },
    })
    salon: Omit<Salon, 'id'>,
  ): Promise<Salon> {
    return this.salonRepository.create(salon);
  }

  @get('/salones/count')
  @response(200, {
    description: 'Salon model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async count(@param.where(Salon) where?: Where<Salon>): Promise<Count> {
    return this.salonRepository.count(where);
  }

  @get('/salones')
  @response(200, {
    description: 'Array of Salon model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Salon, {includeRelations: true}),
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async find(@param.filter(Salon) filter?: Filter<Salon>): Promise<Salon[]> {
    return this.salonRepository.find(filter);
  }

  @get('/salones/{id}/estado', {
    responses: {
      '200': {
        description: 'EstadoAmbiente belonging to Salon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoAmbiente)},
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async getEstadoAmbiente(
    @param.path.string('id') id: typeof Salon.prototype.id,
  ): Promise<EstadoAmbiente> {
    return this.salonRepository.estado(id);
  }

  @patch('/salones')
  @response(200, {
    description: 'Salon PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Salon,
    @param.where(Salon) where?: Where<Salon>,
  ): Promise<Count> {
    return this.salonRepository.updateAll(salon, where);
  }

  @get('/salones/{id}')
  @response(200, {
    description: 'Salon model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Salon, {includeRelations: true}),
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Salon, {exclude: 'where'})
    filter?: FilterExcludingWhere<Salon>,
  ): Promise<Salon> {
    return this.salonRepository.findById(id, filter);
  }

  @patch('/salones/{id}')
  @response(204, {
    description: 'Salon PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Salon,
  ): Promise<void> {
    await this.salonRepository.updateById(id, salon);
  }

  @put('/salones/{id}')
  @response(204, {
    description: 'Salon PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() salon: Salon,
  ): Promise<void> {
    await this.salonRepository.replaceById(id, salon);
  }

  @del('/salones/{id}')
  @response(204, {
    description: 'Salon DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.salonRepository.deleteById(id);
  }
}
