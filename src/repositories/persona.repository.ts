import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Persona, PersonaRelations, TipoPersona} from '../models';
import {TipoPersonaRepository} from './tipo-persona.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {
  public readonly tipoPersona: BelongsToAccessor<
    TipoPersona,
    typeof Persona.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TipoPersonaRepository')
    protected tipoPersonaRepositoryGetter: Getter<TipoPersonaRepository>,
  ) {
    super(Persona, dataSource);
    this.tipoPersona = this.createBelongsToAccessorFor(
      'tipoPersona',
      tipoPersonaRepositoryGetter,
    );
    this.registerInclusionResolver(
      'tipoPersona',
      this.tipoPersona.inclusionResolver,
    );
  }
}
