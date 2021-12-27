import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, Habitacion} from '../models';
import {HabitacionRepository} from './habitacion.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly habitaciones: HasManyRepositoryFactory<Habitacion, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('HabitacionRepository') protected habitacionRepositoryGetter: Getter<HabitacionRepository>,
  ) {
    super(Categoria, dataSource);
    this.habitaciones = this.createHasManyRepositoryFactoryFor('habitaciones', habitacionRepositoryGetter,);
    this.registerInclusionResolver('habitaciones', this.habitaciones.inclusionResolver);
  }
}
