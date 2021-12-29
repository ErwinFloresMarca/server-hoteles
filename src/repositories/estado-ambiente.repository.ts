import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {EstadoAmbiente, EstadoAmbienteRelations, Habitacion, Salon} from '../models';
import {HabitacionRepository} from './habitacion.repository';
import {SalonRepository} from './salon.repository';

export class EstadoAmbienteRepository extends DefaultCrudRepository<
  EstadoAmbiente,
  typeof EstadoAmbiente.prototype.id,
  EstadoAmbienteRelations
> {

  public readonly habitaciones: HasManyRepositoryFactory<Habitacion, typeof EstadoAmbiente.prototype.id>;

  public readonly salones: HasManyRepositoryFactory<Salon, typeof EstadoAmbiente.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HabitacionRepository') protected habitacionRepositoryGetter: Getter<HabitacionRepository>, @repository.getter('SalonRepository') protected salonRepositoryGetter: Getter<SalonRepository>,
  ) {
    super(EstadoAmbiente, dataSource);
    this.salones = this.createHasManyRepositoryFactoryFor('salones', salonRepositoryGetter,);
    this.registerInclusionResolver('salones', this.salones.inclusionResolver);
    this.habitaciones = this.createHasManyRepositoryFactoryFor('habitaciones', habitacionRepositoryGetter,);
    this.registerInclusionResolver('habitaciones', this.habitaciones.inclusionResolver);
  }
}
