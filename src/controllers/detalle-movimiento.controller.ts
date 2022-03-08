import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Detalle,
  Movimiento,
} from '../models';
import {DetalleRepository} from '../repositories';

export class DetalleMovimientoController {
  constructor(
    @repository(DetalleRepository)
    public detalleRepository: DetalleRepository,
  ) { }

  @get('/detalles/{id}/movimiento', {
    responses: {
      '200': {
        description: 'Movimiento belonging to Detalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Movimiento)},
          },
        },
      },
    },
  })
  async getMovimiento(
    @param.path.string('id') id: typeof Detalle.prototype.id,
  ): Promise<Movimiento> {
    return this.detalleRepository.movimiento(id);
  }
}
