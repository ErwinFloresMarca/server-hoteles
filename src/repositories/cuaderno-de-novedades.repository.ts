import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {
  CuadernoDeNovedades,
  CuadernoDeNovedadesRelations,
  User,
} from '../models';
import {UserRepository} from './user.repository';

export class CuadernoDeNovedadesRepository extends DefaultCrudRepository<
  CuadernoDeNovedades,
  typeof CuadernoDeNovedades.prototype.id,
  CuadernoDeNovedadesRelations
> {
  public readonly user: BelongsToAccessor<
    User,
    typeof CuadernoDeNovedades.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(CuadernoDeNovedades, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
