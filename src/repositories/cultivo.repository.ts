import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HectareasGshDbDataSource} from '../datasources';
import {Cultivo, CultivoRelations, Parcela} from '../models';
import {ParcelaRepository} from './parcela.repository';

export class CultivoRepository extends DefaultCrudRepository<
  Cultivo,
  typeof Cultivo.prototype._id,
  CultivoRelations
> {

  public readonly parcela: BelongsToAccessor<Parcela, typeof Cultivo.prototype._id>;

  constructor(
    @inject('datasources.hectareasGSHDb') dataSource: HectareasGshDbDataSource, @repository.getter('ParcelaRepository') protected parcelaRepositoryGetter: Getter<ParcelaRepository>,
  ) {
    super(Cultivo, dataSource);
    this.parcela = this.createBelongsToAccessorFor('parcela', parcelaRepositoryGetter,);
    this.registerInclusionResolver('parcela', this.parcela.inclusionResolver);
  }
}
