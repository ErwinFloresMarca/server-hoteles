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
  Categoria,
  Habitacion,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaHabitacionController {
  constructor(
    @repository(CategoriaRepository) protected categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/habitacions', {
    responses: {
      '200': {
        description: 'Array of Categoria has many Habitacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Habitacion>,
  ): Promise<Habitacion[]> {
    return this.categoriaRepository.habitaciones(id).find(filter);
  }

  @post('/categorias/{id}/habitacions', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitacion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {
            title: 'NewHabitacionInCategoria',
            exclude: ['id'],
            optional: ['categoriaId']
          }),
        },
      },
    }) habitacion: Omit<Habitacion, 'id'>,
  ): Promise<Habitacion> {
    return this.categoriaRepository.habitaciones(id).create(habitacion);
  }

  @patch('/categorias/{id}/habitacions', {
    responses: {
      '200': {
        description: 'Categoria.Habitacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {partial: true}),
        },
      },
    })
    habitacion: Partial<Habitacion>,
    @param.query.object('where', getWhereSchemaFor(Habitacion)) where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.categoriaRepository.habitaciones(id).patch(habitacion, where);
  }

  @del('/categorias/{id}/habitacions', {
    responses: {
      '200': {
        description: 'Categoria.Habitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitacion)) where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.categoriaRepository.habitaciones(id).delete(where);
  }
}
