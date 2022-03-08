import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Salon, SalonRelations, EstadoAmbiente, Recepcion} from '../models';
import {EstadoAmbienteRepository} from './estado-ambiente.repository';
import {RecepcionRepository} from './recepcion.repository';

export class SalonRepository extends DefaultCrudRepository<
  Salon,
  typeof Salon.prototype.id,
  SalonRelations
> {

  public readonly estado: BelongsToAccessor<EstadoAmbiente, typeof Salon.prototype.id>;

  public readonly recepciones: HasManyRepositoryFactory<Recepcion, typeof Salon.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('EstadoAmbienteRepository') protected estadoAmbienteRepositoryGetter: Getter<EstadoAmbienteRepository>, @repository.getter('RecepcionRepository') protected recepcionRepositoryGetter: Getter<RecepcionRepository>,
  ) {
    super(Salon, dataSource);
    this.recepciones = this.createHasManyRepositoryFactoryFor('recepciones', recepcionRepositoryGetter,);
    this.registerInclusionResolver('recepciones', this.recepciones.inclusionResolver);
    this.estado = this.createBelongsToAccessorFor('estado', estadoAmbienteRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
