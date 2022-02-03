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
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Persona, TipoPersona} from '../models';
import {TipoPersonaRepository} from '../repositories';

@authenticate('jwt')
export class TipoPersonaController {
  constructor(
    @repository(TipoPersonaRepository)
    public tipoPersonaRepository: TipoPersonaRepository,
  ) {}

  @post('/tipo-personas')
  @response(200, {
    description: 'TipoPersona model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoPersona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {
            title: 'NewTipoPersona',
            exclude: ['id'],
          }),
        },
      },
    })
    tipoPersona: Omit<TipoPersona, 'id'>,
  ): Promise<TipoPersona> {
    return this.tipoPersonaRepository.create(tipoPersona);
  }

  @get('/tipo-personas/count')
  @response(200, {
    description: 'TipoPersona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoPersona) where?: Where<TipoPersona>,
  ): Promise<Count> {
    const cantTipoPersonas = (await this.tipoPersonaRepository.count()).count;
    if (cantTipoPersonas === 0) {
      const listEstados = [{descripcion: 'NATURAL'}, {descripcion: 'JURIDICA'}];
      for (const e of listEstados) {
        await this.tipoPersonaRepository.create(e);
      }
    }
    return this.tipoPersonaRepository.count(where);
  }

  @get('/tipo-personas')
  @response(200, {
    description: 'Array of TipoPersona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoPersona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoPersona) filter?: Filter<TipoPersona>,
  ): Promise<TipoPersona[]> {
    const cantTipoPersonas = (await this.tipoPersonaRepository.count()).count;
    if (cantTipoPersonas === 0) {
      const listEstados = [{descripcion: 'NATURAL'}, {descripcion: 'JURIDICA'}];
      for (const e of listEstados) {
        await this.tipoPersonaRepository.create(e);
      }
    }
    return this.tipoPersonaRepository.find(filter);
  }

  @patch('/tipo-personas')
  @response(200, {
    description: 'TipoPersona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {partial: true}),
        },
      },
    })
    tipoPersona: TipoPersona,
    @param.where(TipoPersona) where?: Where<TipoPersona>,
  ): Promise<Count> {
    return this.tipoPersonaRepository.updateAll(tipoPersona, where);
  }

  @get('/tipo-personas/{id}')
  @response(200, {
    description: 'TipoPersona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoPersona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TipoPersona, {exclude: 'where'})
    filter?: FilterExcludingWhere<TipoPersona>,
  ): Promise<TipoPersona> {
    return this.tipoPersonaRepository.findById(id, filter);
  }

  @patch('/tipo-personas/{id}')
  @response(204, {
    description: 'TipoPersona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoPersona, {partial: true}),
        },
      },
    })
    tipoPersona: TipoPersona,
  ): Promise<void> {
    await this.tipoPersonaRepository.updateById(id, tipoPersona);
  }

  @put('/tipo-personas/{id}')
  @response(204, {
    description: 'TipoPersona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tipoPersona: TipoPersona,
  ): Promise<void> {
    await this.tipoPersonaRepository.replaceById(id, tipoPersona);
  }

  @del('/tipo-personas/{id}')
  @response(204, {
    description: 'TipoPersona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tipoPersonaRepository.deleteById(id);
  }

  //tipo persona - persona relation
  @get('/tipo-personas/{id}/personas', {
    responses: {
      '200': {
        description: 'Array of TipoPersona has many Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async findPersonas(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.tipoPersonaRepository.personas(id).find(filter);
  }

  @post('/tipo-personas/{id}/personas', {
    responses: {
      '200': {
        description: 'TipoPersona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async createPersona(
    @param.path.string('id') id: typeof TipoPersona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInTipoPersona',
            exclude: ['id'],
            optional: ['tipoPersonaId'],
          }),
        },
      },
    })
    persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.tipoPersonaRepository.personas(id).create(persona);
  }

  @patch('/tipo-personas/{id}/personas', {
    responses: {
      '200': {
        description: 'TipoPersona.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona))
    where?: Where<Persona>,
  ): Promise<Count> {
    return this.tipoPersonaRepository.personas(id).patch(persona, where);
  }

  @del('/tipo-personas/{id}/personas', {
    responses: {
      '200': {
        description: 'TipoPersona.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona))
    where?: Where<Persona>,
  ): Promise<Count> {
    return this.tipoPersonaRepository.personas(id).delete(where);
  }
}
