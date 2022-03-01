import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cultivo,
  Parcela,
} from '../models';
import {CultivoRepository} from '../repositories';

export class CultivoParcelaController {
  constructor(
    @repository(CultivoRepository)
    public cultivoRepository: CultivoRepository,
  ) { }

  @get('/cultivos/{id}/parcela', {
    responses: {
      '200': {
        description: 'Parcela belonging to Cultivo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parcela)},
          },
        },
      },
    },
  })
  async getParcela(
    @param.path.string('id') id: typeof Cultivo.prototype._id,
  ): Promise<Parcela> {
    return this.cultivoRepository.parcela(id);
  }
}
