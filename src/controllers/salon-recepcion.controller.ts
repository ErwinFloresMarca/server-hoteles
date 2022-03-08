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
  Salon,
  Recepcion,
} from '../models';
import {SalonRepository} from '../repositories';

export class SalonRecepcionController {
  constructor(
    @repository(SalonRepository) protected salonRepository: SalonRepository,
  ) { }

  @get('/salons/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Array of Salon has many Recepcion',
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
    return this.salonRepository.recepciones(id).find(filter);
  }

  @post('/salons/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Salon model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recepcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Salon.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {
            title: 'NewRecepcionInSalon',
            exclude: ['id'],
            optional: ['salonId']
          }),
        },
      },
    }) recepcion: Omit<Recepcion, 'id'>,
  ): Promise<Recepcion> {
    return this.salonRepository.recepciones(id).create(recepcion);
  }

  @patch('/salons/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Salon.Recepcion PATCH success count',
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
    return this.salonRepository.recepciones(id).patch(recepcion, where);
  }

  @del('/salons/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Salon.Recepcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recepcion)) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.salonRepository.recepciones(id).delete(where);
  }
}
