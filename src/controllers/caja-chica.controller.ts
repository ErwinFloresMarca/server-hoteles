import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {CajaChica} from '../models';
import {CajaChicaRepository} from '../repositories';

export class CajaChicaController {
  constructor(
    @repository(CajaChicaRepository)
    public cajaChicaRepository : CajaChicaRepository,
  ) {}

  @post('/caja-chicas')
  @response(200, {
    description: 'CajaChica model instance',
    content: {'application/json': {schema: getModelSchemaRef(CajaChica)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaChica, {
            title: 'NewCajaChica',
            exclude: ['id'],
          }),
        },
      },
    })
    cajaChica: Omit<CajaChica, 'id'>,
  ): Promise<CajaChica> {
    return this.cajaChicaRepository.create(cajaChica);
  }

  @get('/caja-chicas/count')
  @response(200, {
    description: 'CajaChica model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CajaChica) where?: Where<CajaChica>,
  ): Promise<Count> {
    return this.cajaChicaRepository.count(where);
  }

  @get('/caja-chicas')
  @response(200, {
    description: 'Array of CajaChica model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CajaChica, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CajaChica) filter?: Filter<CajaChica>,
  ): Promise<CajaChica[]> {
    return this.cajaChicaRepository.find(filter);
  }

  @patch('/caja-chicas')
  @response(200, {
    description: 'CajaChica PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaChica, {partial: true}),
        },
      },
    })
    cajaChica: CajaChica,
    @param.where(CajaChica) where?: Where<CajaChica>,
  ): Promise<Count> {
    return this.cajaChicaRepository.updateAll(cajaChica, where);
  }

  @get('/caja-chicas/{id}')
  @response(200, {
    description: 'CajaChica model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CajaChica, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CajaChica, {exclude: 'where'}) filter?: FilterExcludingWhere<CajaChica>
  ): Promise<CajaChica> {
    return this.cajaChicaRepository.findById(id, filter);
  }

  @patch('/caja-chicas/{id}')
  @response(204, {
    description: 'CajaChica PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CajaChica, {partial: true}),
        },
      },
    })
    cajaChica: CajaChica,
  ): Promise<void> {
    await this.cajaChicaRepository.updateById(id, cajaChica);
  }

  @put('/caja-chicas/{id}')
  @response(204, {
    description: 'CajaChica PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cajaChica: CajaChica,
  ): Promise<void> {
    await this.cajaChicaRepository.replaceById(id, cajaChica);
  }

  @del('/caja-chicas/{id}')
  @response(204, {
    description: 'CajaChica DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cajaChicaRepository.deleteById(id);
  }
}
