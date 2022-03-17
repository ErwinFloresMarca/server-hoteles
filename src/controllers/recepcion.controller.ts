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
import {Recepcion} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionController {
  constructor(
    @repository(RecepcionRepository)
    public recepcionRepository : RecepcionRepository,
  ) {}

  @post('/recepciones')
  @response(200, {
    description: 'Recepcion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Recepcion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {
            title: 'NewRecepcion',
            exclude: ['id'],
          }),
        },
      },
    })
    recepcion: Omit<Recepcion, 'id'>,
  ): Promise<Recepcion> {
    return this.recepcionRepository.create(recepcion);
  }

  @get('/recepciones/count')
  @response(200, {
    description: 'Recepcion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Recepcion) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.recepcionRepository.count(where);
  }

  @get('/recepciones')
  @response(200, {
    description: 'Array of Recepcion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Recepcion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Recepcion) filter?: Filter<Recepcion>,
  ): Promise<Recepcion[]> {
    return this.recepcionRepository.find(filter);
  }

  @patch('/recepciones')
  @response(200, {
    description: 'Recepcion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {partial: true}),
        },
      },
    })
    recepcion: Recepcion,
    @param.where(Recepcion) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.recepcionRepository.updateAll(recepcion, where);
  }

  @get('/recepciones/{id}')
  @response(200, {
    description: 'Recepcion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Recepcion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Recepcion, {exclude: 'where'}) filter?: FilterExcludingWhere<Recepcion>
  ): Promise<Recepcion> {
    return this.recepcionRepository.findById(id, filter);
  }

  @patch('/recepciones/{id}')
  @response(204, {
    description: 'Recepcion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {partial: true}),
        },
      },
    })
    recepcion: Recepcion,
  ): Promise<void> {
    await this.recepcionRepository.updateById(id, recepcion);
  }

  @put('/recepciones/{id}')
  @response(204, {
    description: 'Recepcion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() recepcion: Recepcion,
  ): Promise<void> {
    await this.recepcionRepository.replaceById(id, recepcion);
  }

  @del('/recepciones/{id}')
  @response(204, {
    description: 'Recepcion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.recepcionRepository.deleteById(id);
  }
}
