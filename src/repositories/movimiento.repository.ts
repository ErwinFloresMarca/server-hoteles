import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Movimiento, MovimientoRelations, Transaccion, Recepcion, User, Detalle} from '../models';
import {TransaccionRepository} from './transaccion.repository';
import {RecepcionRepository} from './recepcion.repository';
import {UserRepository} from './user.repository';
import {DetalleRepository} from './detalle.repository';

export class MovimientoRepository extends DefaultCrudRepository<
  Movimiento,
  typeof Movimiento.prototype.id,
  MovimientoRelations
> {

  public readonly transacciones: HasManyRepositoryFactory<Transaccion, typeof Movimiento.prototype.id>;

  public readonly recepcion: BelongsToAccessor<Recepcion, typeof Movimiento.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Movimiento.prototype.id>;

  public readonly detalles: HasManyRepositoryFactory<Detalle, typeof Movimiento.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('RecepcionRepository') protected recepcionRepositoryGetter: Getter<RecepcionRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('DetalleRepository') protected detalleRepositoryGetter: Getter<DetalleRepository>,
  ) {
    super(Movimiento, dataSource);
    this.detalles = this.createHasManyRepositoryFactoryFor('detalles', detalleRepositoryGetter,);
    this.registerInclusionResolver('detalles', this.detalles.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.recepcion = this.createBelongsToAccessorFor('recepcion', recepcionRepositoryGetter,);
    this.registerInclusionResolver('recepcion', this.recepcion.inclusionResolver);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
  }
}
