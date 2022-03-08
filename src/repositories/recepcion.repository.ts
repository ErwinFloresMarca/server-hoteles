import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Recepcion, RecepcionRelations, Habitacion, Salon, Persona, User, Transaccion, Movimiento} from '../models';
import {HabitacionRepository} from './habitacion.repository';
import {SalonRepository} from './salon.repository';
import {PersonaRepository} from './persona.repository';
import {UserRepository} from './user.repository';
import {TransaccionRepository} from './transaccion.repository';
import {MovimientoRepository} from './movimiento.repository';

export class RecepcionRepository extends DefaultCrudRepository<
  Recepcion,
  typeof Recepcion.prototype.id,
  RecepcionRelations
> {

  public readonly habitacion: BelongsToAccessor<Habitacion, typeof Recepcion.prototype.id>;

  public readonly salon: BelongsToAccessor<Salon, typeof Recepcion.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Recepcion.prototype.id>;

  public readonly user: BelongsToAccessor<User, typeof Recepcion.prototype.id>;

  public readonly transacciones: HasManyRepositoryFactory<Transaccion, typeof Recepcion.prototype.id>;

  public readonly movimientos: HasManyRepositoryFactory<Movimiento, typeof Recepcion.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HabitacionRepository') protected habitacionRepositoryGetter: Getter<HabitacionRepository>, @repository.getter('SalonRepository') protected salonRepositoryGetter: Getter<SalonRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('MovimientoRepository') protected movimientoRepositoryGetter: Getter<MovimientoRepository>,
  ) {
    super(Recepcion, dataSource);
    this.movimientos = this.createHasManyRepositoryFactoryFor('movimientos', movimientoRepositoryGetter,);
    this.registerInclusionResolver('movimientos', this.movimientos.inclusionResolver);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.salon = this.createBelongsToAccessorFor('salon', salonRepositoryGetter,);
    this.registerInclusionResolver('salon', this.salon.inclusionResolver);
    this.habitacion = this.createBelongsToAccessorFor('habitacion', habitacionRepositoryGetter,);
    this.registerInclusionResolver('habitacion', this.habitacion.inclusionResolver);
  }
}
