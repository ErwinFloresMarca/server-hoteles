import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CajaChica,
  User,
} from '../models';
import {CajaChicaRepository} from '../repositories';

export class CajaChicaUserController {
  constructor(
    @repository(CajaChicaRepository)
    public cajaChicaRepository: CajaChicaRepository,
  ) { }

  @get('/caja-chicas/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to CajaChica',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof CajaChica.prototype.id,
  ): Promise<User> {
    return this.cajaChicaRepository.user(id);
  }
}
