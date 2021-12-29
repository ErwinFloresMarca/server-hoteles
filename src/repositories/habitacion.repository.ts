import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Habitacion, HabitacionRelations, Categoria, EstadoAmbiente} from '../models';
import {CategoriaRepository} from './categoria.repository';
import {EstadoAmbienteRepository} from './estado-ambiente.repository';

export class HabitacionRepository extends DefaultCrudRepository<
  Habitacion,
  typeof Habitacion.prototype.id,
  HabitacionRelations
> {

  public readonly categoria: BelongsToAccessor<Categoria, typeof Habitacion.prototype.id>;

  public readonly estado: BelongsToAccessor<EstadoAmbiente, typeof Habitacion.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>, @repository.getter('EstadoAmbienteRepository') protected estadoAmbienteRepositoryGetter: Getter<EstadoAmbienteRepository>,
  ) {
    super(Habitacion, dataSource);
    this.estado = this.createBelongsToAccessorFor('estado', estadoAmbienteRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
    this.categoria = this.createBelongsToAccessorFor('categoria', categoriaRepositoryGetter,);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
  }
}
