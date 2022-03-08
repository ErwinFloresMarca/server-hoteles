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
  Producto,
} from '../models';
import {DetalleRepository} from '../repositories';

export class DetalleProductoController {
  constructor(
    @repository(DetalleRepository)
    public detalleRepository: DetalleRepository,
  ) { }

  @get('/detalles/{id}/producto', {
    responses: {
      '200': {
        description: 'Producto belonging to Detalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Producto)},
          },
        },
      },
    },
  })
  async getProducto(
    @param.path.string('id') id: typeof Detalle.prototype.id,
  ): Promise<Producto> {
    return this.detalleRepository.producto(id);
  }
}
