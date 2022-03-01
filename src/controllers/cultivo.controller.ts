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
import {Cultivo} from '../models';
import {CultivoRepository} from '../repositories';

export class CultivoController {
  constructor(
    @repository(CultivoRepository)
    public cultivoRepository : CultivoRepository,
  ) {}

  @post('/cultivos')
  @response(200, {
    description: 'Cultivo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cultivo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cultivo, {
            title: 'NewCultivo',
            exclude: ['_id'],
          }),
        },
      },
    })
    cultivo: Omit<Cultivo, '_id'>,
  ): Promise<Cultivo> {
    return this.cultivoRepository.create(cultivo);
  }

  @get('/cultivos/count')
  @response(200, {
    description: 'Cultivo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cultivo) where?: Where<Cultivo>,
  ): Promise<Count> {
    return this.cultivoRepository.count(where);
  }

  @get('/cultivos')
  @response(200, {
    description: 'Array of Cultivo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cultivo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cultivo) filter?: Filter<Cultivo>,
  ): Promise<Cultivo[]> {
    return this.cultivoRepository.find(filter);
  }

  @patch('/cultivos')
  @response(200, {
    description: 'Cultivo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cultivo, {partial: true}),
        },
      },
    })
    cultivo: Cultivo,
    @param.where(Cultivo) where?: Where<Cultivo>,
  ): Promise<Count> {
    return this.cultivoRepository.updateAll(cultivo, where);
  }

  @get('/cultivos/{id}')
  @response(200, {
    description: 'Cultivo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cultivo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cultivo, {exclude: 'where'}) filter?: FilterExcludingWhere<Cultivo>
  ): Promise<Cultivo> {
    return this.cultivoRepository.findById(id, filter);
  }

  @patch('/cultivos/{id}')
  @response(204, {
    description: 'Cultivo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cultivo, {partial: true}),
        },
      },
    })
    cultivo: Cultivo,
  ): Promise<void> {
    await this.cultivoRepository.updateById(id, cultivo);
  }

  @put('/cultivos/{id}')
  @response(204, {
    description: 'Cultivo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cultivo: Cultivo,
  ): Promise<void> {
    await this.cultivoRepository.replaceById(id, cultivo);
  }

  @del('/cultivos/{id}')
  @response(204, {
    description: 'Cultivo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cultivoRepository.deleteById(id);
  }
}
