import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Habitacion, HabitacionRelations} from '../models';

export class HabitacionRepository extends DefaultCrudRepository<
  Habitacion,
  typeof Habitacion.prototype.id,
  HabitacionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Habitacion, dataSource);
  }
}
