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
  Habitacion,
  Recepcion,
} from '../models';
import {HabitacionRepository} from '../repositories';

export class HabitacionRecepcionController {
  constructor(
    @repository(HabitacionRepository) protected habitacionRepository: HabitacionRepository,
  ) { }

  @get('/habitacions/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Array of Habitacion has many Recepcion',
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
    return this.habitacionRepository.recepciones(id).find(filter);
  }

  @post('/habitacions/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Habitacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Recepcion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitacion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Recepcion, {
            title: 'NewRecepcionInHabitacion',
            exclude: ['id'],
            optional: ['habitacionId']
          }),
        },
      },
    }) recepcion: Omit<Recepcion, 'id'>,
  ): Promise<Recepcion> {
    return this.habitacionRepository.recepciones(id).create(recepcion);
  }

  @patch('/habitacions/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Habitacion.Recepcion PATCH success count',
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
    return this.habitacionRepository.recepciones(id).patch(recepcion, where);
  }

  @del('/habitacions/{id}/recepcions', {
    responses: {
      '200': {
        description: 'Habitacion.Recepcion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Recepcion)) where?: Where<Recepcion>,
  ): Promise<Count> {
    return this.habitacionRepository.recepciones(id).delete(where);
  }
}
