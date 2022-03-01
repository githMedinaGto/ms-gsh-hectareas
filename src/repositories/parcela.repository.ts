import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {HectareasGshDbDataSource} from '../datasources';
import {Parcela, ParcelaRelations, Hectarea} from '../models';
import {HectareaRepository} from './hectarea.repository';

export class ParcelaRepository extends DefaultCrudRepository<
  Parcela,
  typeof Parcela.prototype._id,
  ParcelaRelations
> {

  public readonly hectarea: BelongsToAccessor<Hectarea, typeof Parcela.prototype._id>;

  public readonly estaAsociado: HasManyRepositoryFactory<Hectarea, typeof Parcela.prototype._id>;

  constructor(
    @inject('datasources.hectareasGSHDb') dataSource: HectareasGshDbDataSource, @repository.getter('HectareaRepository') protected hectareaRepositoryGetter: Getter<HectareaRepository>,
  ) {
    super(Parcela, dataSource);
    this.estaAsociado = this.createHasManyRepositoryFactoryFor('estaAsociado', hectareaRepositoryGetter,);
    this.registerInclusionResolver('estaAsociado', this.estaAsociado.inclusionResolver);
    this.hectarea = this.createBelongsToAccessorFor('hectarea', hectareaRepositoryGetter,);
    this.registerInclusionResolver('hectarea', this.hectarea.inclusionResolver);
  }
}
