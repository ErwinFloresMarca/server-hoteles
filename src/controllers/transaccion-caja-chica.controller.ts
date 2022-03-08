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
  CajaChica,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionCajaChicaController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/caja-chica', {
    responses: {
      '200': {
        description: 'CajaChica belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CajaChica)},
          },
        },
      },
    },
  })
  async getCajaChica(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<CajaChica> {
    return this.transaccionRepository.cajaChica(id);
  }
}
