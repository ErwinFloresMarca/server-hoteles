import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Salon, SalonRelations, EstadoAmbiente} from '../models';
import {EstadoAmbienteRepository} from './estado-ambiente.repository';

export class SalonRepository extends DefaultCrudRepository<
  Salon,
  typeof Salon.prototype.id,
  SalonRelations
> {

  public readonly estado: BelongsToAccessor<EstadoAmbiente, typeof Salon.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EstadoAmbienteRepository') protected estadoAmbienteRepositoryGetter: Getter<EstadoAmbienteRepository>,
  ) {
    super(Salon, dataSource);
    this.estado = this.createBelongsToAccessorFor('estado', estadoAmbienteRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
