import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Producto, ProductoRelations, Detalle} from '../models';
import {DetalleRepository} from './detalle.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.id,
  ProductoRelations
> {

  public readonly detalles: HasManyRepositoryFactory<Detalle, typeof Producto.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DetalleRepository') protected detalleRepositoryGetter: Getter<DetalleRepository>,
  ) {
    super(Producto, dataSource);
    this.detalles = this.createHasManyRepositoryFactoryFor('detalles', detalleRepositoryGetter,);
    this.registerInclusionResolver('detalles', this.detalles.inclusionResolver);
  }
}
