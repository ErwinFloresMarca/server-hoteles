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
  Movimiento,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionMovimientoController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/movimiento', {
    responses: {
      '200': {
        description: 'Movimiento belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movimiento)},
          },
        },
      },
    },
  })
  async getMovimiento(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<Movimiento> {
    return this.transaccionRepository.movimiento(id);
  }
}
