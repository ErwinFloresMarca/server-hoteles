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
  getWhereSchemaFor,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {basicAuthorization} from '../middlewares/auth.midd';
import {Categoria, Habitacion} from '../models';
import {CategoriaRepository} from '../repositories';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin'],
  voters: [basicAuthorization],
})
export class CategoriaController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository: CategoriaRepository,
  ) {}

  @post('/categorias')
  @response(200, {
    description: 'Categoria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoria',
            exclude: ['id'],
          }),
        },
      },
    })
    categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.categoriaRepository.create(categoria);
  }

  @get('/categorias/count')
  @response(200, {
    description: 'Categoria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.count(where);
  }

  @get('/categorias')
  @response(200, {
    description: 'Array of Categoria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categoria, {includeRelations: true}),
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Categoria) filter?: Filter<Categoria>,
  ): Promise<Categoria[]> {
    return this.categoriaRepository.find(filter);
  }

  @patch('/categorias')
  @response(200, {
    description: 'Categoria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Categoria,
    @param.where(Categoria) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.categoriaRepository.updateAll(categoria, where);
  }

  @get('/categorias/{id}')
  @response(200, {
    description: 'Categoria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categoria, {includeRelations: true}),
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Categoria, {exclude: 'where'})
    filter?: FilterExcludingWhere<Categoria>,
  ): Promise<Categoria> {
    return this.categoriaRepository.findById(id, filter);
  }

  @patch('/categorias/{id}')
  @response(204, {
    description: 'Categoria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Categoria,
  ): Promise<void> {
    await this.categoriaRepository.updateById(id, categoria);
  }

  @put('/categorias/{id}')
  @response(204, {
    description: 'Categoria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoria: Categoria,
  ): Promise<void> {
    await this.categoriaRepository.replaceById(id, categoria);
  }

  @del('/categorias/{id}')
  @response(204, {
    description: 'Categoria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriaRepository.deleteById(id);
  }

  //Categoria - Habiatciones routes

  @get('/categorias/{id}/habitaciones', {
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
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findHabitaciones(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Habitacion>,
  ): Promise<Habitacion[]> {
    return this.categoriaRepository.habitaciones(id).find(filter);
  }

  @post('/categorias/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'Categoria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitacion)}},
      },
    },
  })
  async createHabitacion(
    @param.path.string('id') id: typeof Categoria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {
            title: 'NewHabitacionInCategoria',
            exclude: ['id'],
            optional: ['categoriaId'],
          }),
        },
      },
    })
    habitacion: Omit<Habitacion, 'id'>,
  ): Promise<Habitacion> {
    return this.categoriaRepository.habitaciones(id).create(habitacion);
  }

  @patch('/categorias/{id}/habitaciones', {
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
    @param.query.object('where', getWhereSchemaFor(Habitacion))
    where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.categoriaRepository.habitaciones(id).patch(habitacion, where);
  }

  @del('/categorias/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'Categoria.Habitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitacion))
    where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.categoriaRepository.habitaciones(id).delete(where);
  }
}
