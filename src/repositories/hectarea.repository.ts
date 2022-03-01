import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {HectareasGshDbDataSource} from '../datasources';
import {Hectarea, HectareaRelations} from '../models';

export class HectareaRepository extends DefaultCrudRepository<
  Hectarea,
  typeof Hectarea.prototype._id,
  HectareaRelations
> {
  constructor(
    @inject('datasources.hectareasGSHDb') dataSource: HectareasGshDbDataSource,
  ) {
    super(Hectarea, dataSource);
  }
}
