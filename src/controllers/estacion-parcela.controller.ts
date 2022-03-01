import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Estacion,
  Parcela,
} from '../models';
import {EstacionRepository} from '../repositories';

export class EstacionParcelaController {
  constructor(
    @repository(EstacionRepository)
    public estacionRepository: EstacionRepository,
  ) { }

  @get('/estacions/{id}/parcela', {
    responses: {
      '200': {
        description: 'Parcela belonging to Estacion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parcela)},
          },
        },
      },
    },
  })
  async getParcela(
    @param.path.string('id') id: typeof Estacion.prototype._id,
  ): Promise<Parcela> {
    return this.estacionRepository.parcela(id);
  }
}
