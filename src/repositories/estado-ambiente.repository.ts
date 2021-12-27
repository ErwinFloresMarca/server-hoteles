import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {EstadoAmbiente, EstadoAmbienteRelations} from '../models';

export class EstadoAmbienteRepository extends DefaultCrudRepository<
  EstadoAmbiente,
  typeof EstadoAmbiente.prototype.id,
  EstadoAmbienteRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(EstadoAmbiente, dataSource);
  }
}
