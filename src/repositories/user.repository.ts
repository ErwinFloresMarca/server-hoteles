import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserCredentials, UserRelations, CuadernoDeNovedades} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {CuadernoDeNovedadesRepository} from './cuaderno-de-novedades.repository';

export type Credentials = {
  email: string;
  nombreUsuario?: string;
  nombreCompleto?: string;
  password: string;
  role?: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  public readonly userCredentials: HasOneRepositoryFactory<
    UserCredentials,
    typeof User.prototype.id
  >;

  public readonly cuadernoDeNovedades: HasManyRepositoryFactory<CuadernoDeNovedades, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('CuadernoDeNovedadesRepository') protected cuadernoDeNovedadesRepositoryGetter: Getter<CuadernoDeNovedadesRepository>,
  ) {
    super(User, dataSource);
    this.cuadernoDeNovedades = this.createHasManyRepositoryFactoryFor('cuadernoDeNovedades', cuadernoDeNovedadesRepositoryGetter,);
    this.registerInclusionResolver('cuadernoDeNovedades', this.cuadernoDeNovedades.inclusionResolver);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      userCredentialsRepositoryGetter,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }
  async findCredentials(
    userId: typeof User.prototype.id,
  ): Promise<UserCredentials | undefined> {
    try {
      return await this.userCredentials(userId).get();
    } catch (err) {
      if (err.code === 'ENTITY_NOT_FOUND') {
        return undefined;
      }
      throw err;
    }
  }
}
