import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Persona, PersonaRelations, TipoPersona, Recepcion} from '../models';
import {TipoPersonaRepository} from './tipo-persona.repository';
import {RecepcionRepository} from './recepcion.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {
  public readonly tipoPersona: BelongsToAccessor<
    TipoPersona,
    typeof Persona.prototype.id
  >;

  public readonly recepciones: HasManyRepositoryFactory<Recepcion, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('TipoPersonaRepository')
    protected tipoPersonaRepositoryGetter: Getter<TipoPersonaRepository>, @repository.getter('RecepcionRepository') protected recepcionRepositoryGetter: Getter<RecepcionRepository>,
  ) {
    super(Persona, dataSource);
    this.recepciones = this.createHasManyRepositoryFactoryFor('recepciones', recepcionRepositoryGetter,);
    this.registerInclusionResolver('recepciones', this.recepciones.inclusionResolver);
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
