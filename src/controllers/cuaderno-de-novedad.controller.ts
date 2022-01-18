import {authenticate} from '@loopback/authentication';
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
import {CuadernoDeNovedades, User} from '../models';
import {CuadernoDeNovedadesRepository} from '../repositories';

@authenticate('jwt')
export class CuadernoDeNovedadController {
  constructor(
    @repository(CuadernoDeNovedadesRepository)
    public cuadernoDeNovedadesRepository: CuadernoDeNovedadesRepository,
  ) {}

  @post('/cuaderno-de-novedades')
  @response(200, {
    description: 'CuadernoDeNovedades model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(CuadernoDeNovedades)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuadernoDeNovedades, {
            title: 'NewCuadernoDeNovedades',
            exclude: ['id'],
          }),
        },
      },
    })
    cuadernoDeNovedades: Omit<CuadernoDeNovedades, 'id'>,
  ): Promise<CuadernoDeNovedades> {
    return this.cuadernoDeNovedadesRepository.create(cuadernoDeNovedades);
  }

  @get('/cuaderno-de-novedades/count')
  @response(200, {
    description: 'CuadernoDeNovedades model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CuadernoDeNovedades) where?: Where<CuadernoDeNovedades>,
  ): Promise<Count> {
    return this.cuadernoDeNovedadesRepository.count(where);
  }

  @get('/cuaderno-de-novedades')
  @response(200, {
    description: 'Array of CuadernoDeNovedades model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CuadernoDeNovedades, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(CuadernoDeNovedades) filter?: Filter<CuadernoDeNovedades>,
  ): Promise<CuadernoDeNovedades[]> {
    return this.cuadernoDeNovedadesRepository.find(filter);
  }

  @patch('/cuaderno-de-novedades')
  @response(200, {
    description: 'CuadernoDeNovedades PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuadernoDeNovedades, {partial: true}),
        },
      },
    })
    cuadernoDeNovedades: CuadernoDeNovedades,
    @param.where(CuadernoDeNovedades) where?: Where<CuadernoDeNovedades>,
  ): Promise<Count> {
    return this.cuadernoDeNovedadesRepository.updateAll(
      cuadernoDeNovedades,
      where,
    );
  }

  @get('/cuaderno-de-novedades/{id}')
  @response(200, {
    description: 'CuadernoDeNovedades model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CuadernoDeNovedades, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CuadernoDeNovedades, {exclude: 'where'})
    filter?: FilterExcludingWhere<CuadernoDeNovedades>,
  ): Promise<CuadernoDeNovedades> {
    return this.cuadernoDeNovedadesRepository.findById(id, filter);
  }

  @patch('/cuaderno-de-novedades/{id}')
  @response(204, {
    description: 'CuadernoDeNovedades PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuadernoDeNovedades, {partial: true}),
        },
      },
    })
    cuadernoDeNovedades: CuadernoDeNovedades,
  ): Promise<void> {
    await this.cuadernoDeNovedadesRepository.updateById(
      id,
      cuadernoDeNovedades,
    );
  }

  @put('/cuaderno-de-novedades/{id}')
  @response(204, {
    description: 'CuadernoDeNovedades PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cuadernoDeNovedades: CuadernoDeNovedades,
  ): Promise<void> {
    await this.cuadernoDeNovedadesRepository.replaceById(
      id,
      cuadernoDeNovedades,
    );
  }

  @del('/cuaderno-de-novedades/{id}')
  @response(204, {
    description: 'CuadernoDeNovedades DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cuadernoDeNovedadesRepository.deleteById(id);
  }

  //Cuaderno de novedades - User relationship
  @get('/cuaderno-de-novedades/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to CuadernoDeNovedades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof CuadernoDeNovedades.prototype.id,
  ): Promise<User> {
    return this.cuadernoDeNovedadesRepository.user(id);
  }
}
