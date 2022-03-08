import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserCredentials, UserRelations, CuadernoDeNovedades, Recepcion, Transaccion, CajaChica, Movimiento} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {CuadernoDeNovedadesRepository} from './cuaderno-de-novedades.repository';
import {RecepcionRepository} from './recepcion.repository';
import {TransaccionRepository} from './transaccion.repository';
import {CajaChicaRepository} from './caja-chica.repository';
import {MovimientoRepository} from './movimiento.repository';

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

  public readonly recepciones: HasManyRepositoryFactory<Recepcion, typeof User.prototype.id>;

  public readonly transacciones: HasManyRepositoryFactory<Transaccion, typeof User.prototype.id>;

  public readonly cajaChicas: HasManyRepositoryFactory<CajaChica, typeof User.prototype.id>;

  public readonly movimientos: HasManyRepositoryFactory<Movimiento, typeof User.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserCredentialsRepository')
    protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('CuadernoDeNovedadesRepository') protected cuadernoDeNovedadesRepositoryGetter: Getter<CuadernoDeNovedadesRepository>, @repository.getter('RecepcionRepository') protected recepcionRepositoryGetter: Getter<RecepcionRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('CajaChicaRepository') protected cajaChicaRepositoryGetter: Getter<CajaChicaRepository>, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>,
  ) {
    super(User, dataSource);
    this.movimientos = this.createHasManyRepositoryFactoryFor('movimientos', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimientos', this.movimientos.inclusionResolver);
    this.cajaChicas = this.createHasManyRepositoryFactoryFor('cajaChicas', cajaChicaRepositoryGetter,);
    this.registerInclusionResolver('cajaChicas', this.cajaChicas.inclusionResolver);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
    this.recepciones = this.createHasManyRepositoryFactoryFor('recepciones', recepcionRepositoryGetter,);
    this.registerInclusionResolver('recepciones', this.recepciones.inclusionResolver);
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
