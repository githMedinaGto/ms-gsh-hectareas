import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Suelo,
  Parcela,
} from '../models';
import {SueloRepository} from '../repositories';

export class SueloParcelaController {
  constructor(
    @repository(SueloRepository)
    public sueloRepository: SueloRepository,
  ) { }

  @get('/suelos/{id}/parcela', {
    responses: {
      '200': {
        description: 'Parcela belonging to Suelo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parcela)},
          },
        },
      },
    },
  })
  async getParcela(
    @param.path.string('id') id: typeof Suelo.prototype._id,
  ): Promise<Parcela> {
    return this.sueloRepository.parcela(id);
  }
}
