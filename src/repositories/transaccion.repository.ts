import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Transaccion, TransaccionRelations, User, Recepcion, CajaChica, Movimiento} from '../models';
import {UserRepository} from './user.repository';
import {RecepcionRepository} from './recepcion.repository';
import {CajaChicaRepository} from './caja-chica.repository';
import {MovimientoRepository} from './movimiento.repository';

export class TransaccionRepository extends DefaultCrudRepository<
  Transaccion,
  typeof Transaccion.prototype.id,
  TransaccionRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Transaccion.prototype.id>;

  public readonly recepcion: BelongsToAccessor<Recepcion, typeof Transaccion.prototype.id>;

  public readonly cajaChica: BelongsToAccessor<CajaChica, typeof Transaccion.prototype.id>;

  public readonly movimiento: BelongsToAccessor<Movimiento, typeof Transaccion.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('RecepcionRepository') protected recepcionRepositoryGetter: Getter<RecepcionRepository>, @repository.getter('CajaChicaRepository') protected cajaChicaRepositoryGetter: Getter<CajaChicaRepository>, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>,
  ) {
    super(Transaccion, dataSource);
    this.movimiento = this.createBelongsToAccessorFor('movimiento', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimiento', this.movimiento.inclusionResolver);
    this.cajaChica = this.createBelongsToAccessorFor('cajaChica', cajaChicaRepositoryGetter,);
    this.registerInclusionResolver('cajaChica', this.cajaChica.inclusionResolver);
    this.recepcion = this.createBelongsToAccessorFor('recepcion', recepcionRepositoryGetter,);
    this.registerInclusionResolver('recepcion', this.recepcion.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
