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
  Persona,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionPersonaController {
  constructor(
    @repository(RecepcionRepository)
    public recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Recepcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
  ): Promise<Persona> {
    return this.recepcionRepository.persona(id);
  }
}
