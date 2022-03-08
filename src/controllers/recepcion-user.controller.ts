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
  User,
} from '../models';
import {RecepcionRepository} from '../repositories';

export class RecepcionUserController {
  constructor(
    @repository(RecepcionRepository)
    public recepcionRepository: RecepcionRepository,
  ) { }

  @get('/recepcions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Recepcion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Recepcion.prototype.id,
  ): Promise<User> {
    return this.recepcionRepository.user(id);
  }
}
