import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Salon, SalonRelations} from '../models';

export class SalonRepository extends DefaultCrudRepository<
  Salon,
  typeof Salon.prototype.id,
  SalonRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Salon, dataSource);
  }
}
