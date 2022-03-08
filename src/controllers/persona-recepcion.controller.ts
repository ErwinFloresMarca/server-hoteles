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
  Persona,
  Recepcion,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaRecepcionController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Array of Persona has many Recepcion',
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
    return this.personaRepository.recepciones(id).find(filter);
  }

  @post('/personas/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recepcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {
            title: 'NewRecepcionInPersona',
            exclude: ['id'],
            optional: ['personaId']
          }),
        },
      },
    }) recepcion: Omit<Recepcion, 'id'>,
  ): Promise<Recepcion> {
    return this.personaRepository.recepciones(id).create(recepcion);
  }

  @patch('/personas/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Persona.Recepcion PATCH success count',
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
    return this.personaRepository.recepciones(id).patch(recepcion, where);
  }

  @del('/personas/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Persona.Recepcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recepcion)) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.personaRepository.recepciones(id).delete(where);
  }
}
