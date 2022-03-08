import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Detalle, DetalleRelations, Movimiento, Producto} from '../models';
import {MovimientoRepository} from './movimiento.repository';
import {ProductoRepository} from './producto.repository';

export class DetalleRepository extends DefaultCrudRepository<
  Detalle,
  typeof Detalle.prototype.id,
  DetalleRelations
> {

  public readonly movimiento: BelongsToAccessor<Movimiento, typeof Detalle.prototype.id>;

  public readonly producto: BelongsToAccessor<Producto, typeof Detalle.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>,
  ) {
    super(Detalle, dataSource);
    this.producto = this.createBelongsToAccessorFor('producto', productoRepositoryGetter,);
    this.registerInclusionResolver('producto', this.producto.inclusionResolver);
    this.movimiento = this.createBelongsToAccessorFor('movimiento', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimiento', this.movimiento.inclusionResolver);
  }
}
