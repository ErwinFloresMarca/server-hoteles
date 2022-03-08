import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {CajaChica, CajaChicaRelations, Transaccion, User} from '../models';
import {TransaccionRepository} from './transaccion.repository';
import {UserRepository} from './user.repository';

export class CajaChicaRepository extends DefaultCrudRepository<
  CajaChica,
  typeof CajaChica.prototype.id,
  CajaChicaRelations
> {

  public readonly transacciones: HasManyRepositoryFactory<Transaccion, typeof CajaChica.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof CajaChica.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(CajaChica, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
  }
}
