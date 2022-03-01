import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {HectareasGshDbDataSource} from '../datasources';
import {Suelo, SueloRelations, Parcela} from '../models';
import {ParcelaRepository} from './parcela.repository';

export class SueloRepository extends DefaultCrudRepository<
  Suelo,
  typeof Suelo.prototype._id,
  SueloRelations
> {

  public readonly parcela: BelongsToAccessor<Parcela, typeof Suelo.prototype._id>;

  constructor(
    @inject('datasources.hectareasGSHDb') dataSource: HectareasGshDbDataSource, @repository.getter('ParcelaRepository') protected parcelaRepositoryGetter: Getter<ParcelaRepository>,
  ) {
    super(Suelo, dataSource);
    this.parcela = this.createBelongsToAccessorFor('parcela', parcelaRepositoryGetter,);
    this.registerInclusionResolver('parcela', this.parcela.inclusionResolver);
  }
}
