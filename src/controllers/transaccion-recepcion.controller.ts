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
  Recepcion,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionRecepcionController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/recepcion', {
    responses: {
      '200': {
        description: 'Recepcion belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recepcion)},
          },
        },
      },
    },
  })
  async getRecepcion(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<Recepcion> {
    return this.transaccionRepository.recepcion(id);
  }
}
