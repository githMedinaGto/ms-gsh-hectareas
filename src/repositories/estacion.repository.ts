import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HectareasGshDbDataSource} from '../datasources';
import {Estacion, EstacionRelations, Parcela} from '../models';
import {ParcelaRepository} from './parcela.repository';

export class EstacionRepository extends DefaultCrudRepository<
  Estacion,
  typeof Estacion.prototype._id,
  EstacionRelations
> {

  public readonly parcela: BelongsToAccessor<Parcela, typeof Estacion.prototype._id>;

  constructor(
    @inject('datasources.hectareasGSHDb') dataSource: HectareasGshDbDataSource, @repository.getter('ParcelaRepository') protected parcelaRepositoryGetter: Getter<ParcelaRepository>,
  ) {
    super(Estacion, dataSource);
    this.parcela = this.createBelongsToAccessorFor('parcela', parcelaRepositoryGetter,);
    this.registerInclusionResolver('parcela', this.parcela.inclusionResolver);
  }
}
