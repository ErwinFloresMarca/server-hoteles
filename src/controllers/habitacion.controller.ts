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
import {Categoria, EstadoAmbiente, Habitacion} from '../models';
import {HabitacionRepository} from '../repositories';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin'],
  voters: [basicAuthorization],
})
export class HabitacionController {
  constructor(
    @repository(HabitacionRepository)
    public habitacionRepository: HabitacionRepository,
  ) {}

  @post('/habitaciones')
  @response(200, {
    description: 'Habitacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Habitacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {
            title: 'NewHabitacion',
            exclude: ['id'],
          }),
        },
      },
    })
    habitacion: Omit<Habitacion, 'id'>,
  ): Promise<Habitacion> {
    return this.habitacionRepository.create(habitacion);
  }

  @get('/habitaciones/count')
  @response(200, {
    description: 'Habitacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async count(
    @param.where(Habitacion) where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.habitacionRepository.count(where);
  }

  @get('/habitaciones')
  @response(200, {
    description: 'Array of Habitacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Habitacion, {includeRelations: true}),
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Habitacion) filter?: Filter<Habitacion>,
  ): Promise<Habitacion[]> {
    return this.habitacionRepository.find(filter);
  }

  @patch('/habitaciones')
  @response(200, {
    description: 'Habitacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {partial: true}),
        },
      },
    })
    habitacion: Habitacion,
    @param.where(Habitacion) where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.habitacionRepository.updateAll(habitacion, where);
  }

  @get('/habitaciones/{id}')
  @response(200, {
    description: 'Habitacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Habitacion, {includeRelations: true}),
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Habitacion, {exclude: 'where'})
    filter?: FilterExcludingWhere<Habitacion>,
  ): Promise<Habitacion> {
    return this.habitacionRepository.findById(id, filter);
  }

  @patch('/habitaciones/{id}')
  @response(204, {
    description: 'Habitacion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {partial: true}),
        },
      },
    })
    habitacion: Habitacion,
  ): Promise<void> {
    await this.habitacionRepository.updateById(id, habitacion);
  }

  @put('/habitaciones/{id}')
  @response(204, {
    description: 'Habitacion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() habitacion: Habitacion,
  ): Promise<void> {
    await this.habitacionRepository.replaceById(id, habitacion);
  }

  @del('/habitaciones/{id}')
  @response(204, {
    description: 'Habitacion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.habitacionRepository.deleteById(id);
  }

  //Hatitacion - Categoria routes
  @get('/habitaciones/{id}/categoria', {
    responses: {
      '200': {
        description: 'Categoria belonging to Habitacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categoria)},
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async getCategoria(
    @param.path.string('id') id: typeof Habitacion.prototype.id,
  ): Promise<Categoria> {
    return this.habitacionRepository.categoria(id);
  }

  //Habitacion - Estado routes
  @get('/habitaciones/{id}/estado', {
    responses: {
      '200': {
        description: 'EstadoAmbiente belonging to Habitacion',
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
    @param.path.string('id') id: typeof Habitacion.prototype.id,
  ): Promise<EstadoAmbiente> {
    return this.habitacionRepository.estado(id);
  }
}
