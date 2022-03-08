import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Recepcion,
  Habitacion,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionHabitacionController {
  constructor(
    @repository(RecepcionRepository)
    public recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/habitacion', {
    responses: {
      '200': {
        description: 'Habitacion belonging to Recepcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitacion)},
          },
        },
      },
    },
  })
  async getHabitacion(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
  ): Promise<Habitacion> {
    return this.recepcionRepository.habitacion(id);
  }
}
