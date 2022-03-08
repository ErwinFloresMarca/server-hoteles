import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Movimiento,
  User,
} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoUserController {
  constructor(
    @repository(MovimientoRepository)
    public movimientoRepository: MovimientoRepository,
  ) { }

  @get('/movimientos/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Movimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Movimiento.prototype.id,
  ): Promise<User> {
    return this.movimientoRepository.user(id);
  }
}
