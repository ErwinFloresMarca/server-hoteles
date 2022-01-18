import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Persona, TipoPersona, TipoPersonaRelations} from '../models';
import {PersonaRepository} from './persona.repository';

export class TipoPersonaRepository extends DefaultCrudRepository<
  TipoPersona,
  typeof TipoPersona.prototype.id,
  TipoPersonaRelations
> {
  public readonly personas: HasManyRepositoryFactory<
    Persona,
    typeof TipoPersona.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('PersonaRepository')
    protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(TipoPersona, dataSource);
    this.personas = this.createHasManyRepositoryFactoryFor(
      'personas',
      personaRepositoryGetter,
    );
    this.registerInclusionResolver('personas', this.personas.inclusionResolver);
  }
}
