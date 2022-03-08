import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Producto,
  Detalle,
} from '../models';
import {ProductoRepository} from '../repositories';

export class ProductoDetalleController {
  constructor(
    @repository(ProductoRepository) protected productoRepository: ProductoRepository,
  ) { }

  @get('/productos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Array of Producto has many Detalle',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Detalle)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Detalle>,
  ): Promise<Detalle[]> {
    return this.productoRepository.detalles(id).find(filter);
  }

  @post('/productos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Producto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Detalle)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Producto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detalle, {
            title: 'NewDetalleInProducto',
            exclude: ['id'],
            optional: ['productoId']
          }),
        },
      },
    }) detalle: Omit<Detalle, 'id'>,
  ): Promise<Detalle> {
    return this.productoRepository.detalles(id).create(detalle);
  }

  @patch('/productos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Producto.Detalle PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Detalle, {partial: true}),
        },
      },
    })
    detalle: Partial<Detalle>,
    @param.query.object('where', getWhereSchemaFor(Detalle)) where?: Where<Detalle>,
  ): Promise<Count> {
    return this.productoRepository.detalles(id).patch(detalle, where);
  }

  @del('/productos/{id}/detalles', {
    responses: {
      '200': {
        description: 'Producto.Detalle DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Detalle)) where?: Where<Detalle>,
  ): Promise<Count> {
    return this.productoRepository.detalles(id).delete(where);
  }
}
