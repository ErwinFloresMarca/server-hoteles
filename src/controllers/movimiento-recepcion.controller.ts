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
  Recepcion,
} from '../models';
import {MovimientoRepository} from '../repositories';

export class MovimientoRecepcionController {
  constructor(
    @repository(MovimientoRepository)
    public movimientoRepository: MovimientoRepository,
  ) { }

  @get('/movimientos/{id}/recepcion', {
    responses: {
      '200': {
        description: 'Recepcion belonging to Movimiento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Recepcion)},
          },
        },
      },
    },
  })
  async getRecepcion(
    @param.path.string('id') id: typeof Movimiento.prototype.id,
  ): Promise<Recepcion> {
    return this.movimientoRepository.recepcion(id);
  }
}
