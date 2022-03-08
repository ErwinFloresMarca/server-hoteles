import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaccion,
  User,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionUserController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<User> {
    return this.transaccionRepository.user(id);
  }
}
