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
import {EstadoAmbiente, Habitacion, Salon} from '../models';
import {EstadoAmbienteRepository} from '../repositories';

@authenticate('jwt')
@authorize({
  allowedRoles: ['admin'],
  voters: [basicAuthorization],
})
export class EstadoController {
  constructor(
    @repository(EstadoAmbienteRepository)
    public estadoAmbienteRepository: EstadoAmbienteRepository,
  ) {}

  @post('/estados')
  @response(200, {
    description: 'EstadoAmbiente model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoAmbiente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAmbiente, {
            title: 'NewEstadoAmbiente',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoAmbiente: Omit<EstadoAmbiente, 'id'>,
  ): Promise<EstadoAmbiente> {
    return this.estadoAmbienteRepository.create(estadoAmbiente);
  }

  @get('/estados/count')
  @response(200, {
    description: 'EstadoAmbiente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async count(
    @param.where(EstadoAmbiente) where?: Where<EstadoAmbiente>,
  ): Promise<Count> {
    return this.estadoAmbienteRepository.count(where);
  }

  @get('/estados')
  @response(200, {
    description: 'Array of EstadoAmbiente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoAmbiente, {includeRelations: true}),
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(EstadoAmbiente) filter?: Filter<EstadoAmbiente>,
  ): Promise<EstadoAmbiente[]> {
    return this.estadoAmbienteRepository.find(filter);
  }

  @patch('/estados')
  @response(200, {
    description: 'EstadoAmbiente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAmbiente, {partial: true}),
        },
      },
    })
    estadoAmbiente: EstadoAmbiente,
    @param.where(EstadoAmbiente) where?: Where<EstadoAmbiente>,
  ): Promise<Count> {
    return this.estadoAmbienteRepository.updateAll(estadoAmbiente, where);
  }

  @get('/estados/{id}')
  @response(200, {
    description: 'EstadoAmbiente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoAmbiente, {includeRelations: true}),
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoAmbiente, {exclude: 'where'})
    filter?: FilterExcludingWhere<EstadoAmbiente>,
  ): Promise<EstadoAmbiente> {
    return this.estadoAmbienteRepository.findById(id, filter);
  }

  @patch('/estados/{id}')
  @response(204, {
    description: 'EstadoAmbiente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoAmbiente, {partial: true}),
        },
      },
    })
    estadoAmbiente: EstadoAmbiente,
  ): Promise<void> {
    await this.estadoAmbienteRepository.updateById(id, estadoAmbiente);
  }

  @put('/estados/{id}')
  @response(204, {
    description: 'EstadoAmbiente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoAmbiente: EstadoAmbiente,
  ): Promise<void> {
    await this.estadoAmbienteRepository.replaceById(id, estadoAmbiente);
  }

  @del('/estados/{id}')
  @response(204, {
    description: 'EstadoAmbiente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoAmbienteRepository.deleteById(id);
  }

  // Estado - Habiotacion routes
  @get('/estados/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'Array of EstadoAmbiente has many Habitacion',
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
  async findHabitacion(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Habitacion>,
  ): Promise<Habitacion[]> {
    return this.estadoAmbienteRepository.habitaciones(id).find(filter);
  }

  @post('/estados/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitacion)}},
      },
    },
  })
  async createHabitacion(
    @param.path.string('id') id: typeof EstadoAmbiente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitacion, {
            title: 'NewHabitacionInEstadoAmbiente',
            exclude: ['id'],
            optional: ['estadoId'],
          }),
        },
      },
    })
    habitacion: Omit<Habitacion, 'id'>,
  ): Promise<Habitacion> {
    return this.estadoAmbienteRepository.habitaciones(id).create(habitacion);
  }

  @patch('/estados/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente.Habitacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchHabitacion(
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
    return this.estadoAmbienteRepository
      .habitaciones(id)
      .patch(habitacion, where);
  }

  @del('/estados/{id}/habitaciones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente.Habitacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteHabitacion(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitacion))
    where?: Where<Habitacion>,
  ): Promise<Count> {
    return this.estadoAmbienteRepository.habitaciones(id).delete(where);
  }

  // Salon - routes
  @get('/estados/{id}/salones', {
    responses: {
      '200': {
        description: 'Array of EstadoAmbiente has many Salon',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Salon)},
          },
        },
      },
    },
  })
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findSalon(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Salon>,
  ): Promise<Salon[]> {
    return this.estadoAmbienteRepository.salones(id).find(filter);
  }

  @post('/estados/{id}/salones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Salon)}},
      },
    },
  })
  async createSalon(
    @param.path.string('id') id: typeof EstadoAmbiente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {
            title: 'NewSalonInEstadoAmbiente',
            exclude: ['id'],
            optional: ['estadoId'],
          }),
        },
      },
    })
    salon: Omit<Salon, 'id'>,
  ): Promise<Salon> {
    return this.estadoAmbienteRepository.salones(id).create(salon);
  }

  @patch('/estados/{id}/salones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente.Salon PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchSalon(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Salon, {partial: true}),
        },
      },
    })
    salon: Partial<Salon>,
    @param.query.object('where', getWhereSchemaFor(Salon)) where?: Where<Salon>,
  ): Promise<Count> {
    return this.estadoAmbienteRepository.salones(id).patch(salon, where);
  }

  @del('/estados/{id}/salones', {
    responses: {
      '200': {
        description: 'EstadoAmbiente.Salon DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteSalon(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Salon)) where?: Where<Salon>,
  ): Promise<Count> {
    return this.estadoAmbienteRepository.salones(id).delete(where);
  }
}
