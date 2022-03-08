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
  Salon,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionSalonController {
  constructor(
    @repository(RecepcionRepository)
    public recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/salon', {
    responses: {
      '200': {
        description: 'Salon belonging to Recepcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Salon)},
          },
        },
      },
    },
  })
  async getSalon(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
  ): Promise<Salon> {
    return this.recepcionRepository.salon(id);
  }
}
