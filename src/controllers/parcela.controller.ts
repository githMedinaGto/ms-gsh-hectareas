import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Parcela} from '../models';
import {ParcelaRepository} from '../repositories';

export class ParcelaController {
  constructor(
    @repository(ParcelaRepository)
    public parcelaRepository : ParcelaRepository,
  ) {}

  @post('/parcelas')
  @response(200, {
    description: 'Parcela model instance',
    content: {'application/json': {schema: getModelSchemaRef(Parcela)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parcela, {
            title: 'NewParcela',
            exclude: ['_id'],
          }),
        },
      },
    })
    parcela: Omit<Parcela, '_id'>,
  ): Promise<Parcela> {
    return this.parcelaRepository.create(parcela);
  }

  @get('/parcelas/count')
  @response(200, {
    description: 'Parcela model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Parcela) where?: Where<Parcela>,
  ): Promise<Count> {
    return this.parcelaRepository.count(where);
  }

  @get('/parcelas')
  @response(200, {
    description: 'Array of Parcela model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Parcela, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Parcela) filter?: Filter<Parcela>,
  ): Promise<Parcela[]> {
    return this.parcelaRepository.find(filter);
  }

  @patch('/parcelas')
  @response(200, {
    description: 'Parcela PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parcela, {partial: true}),
        },
      },
    })
    parcela: Parcela,
    @param.where(Parcela) where?: Where<Parcela>,
  ): Promise<Count> {
    return this.parcelaRepository.updateAll(parcela, where);
  }

  @get('/parcelas/{id}')
  @response(200, {
    description: 'Parcela model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Parcela, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Parcela, {exclude: 'where'}) filter?: FilterExcludingWhere<Parcela>
  ): Promise<Parcela> {
    return this.parcelaRepository.findById(id, filter);
  }

  @patch('/parcelas/{id}')
  @response(204, {
    description: 'Parcela PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Parcela, {partial: true}),
        },
      },
    })
    parcela: Parcela,
  ): Promise<void> {
    await this.parcelaRepository.updateById(id, parcela);
  }

  @put('/parcelas/{id}')
  @response(204, {
    description: 'Parcela PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() parcela: Parcela,
  ): Promise<void> {
    await this.parcelaRepository.replaceById(id, parcela);
  }

  @del('/parcelas/{id}')
  @response(204, {
    description: 'Parcela DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.parcelaRepository.deleteById(id);
  }
}
