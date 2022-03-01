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
import {Suelo} from '../models';
import {SueloRepository} from '../repositories';

export class SueloController {
  constructor(
    @repository(SueloRepository)
    public sueloRepository : SueloRepository,
  ) {}

  @post('/suelos')
  @response(200, {
    description: 'Suelo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Suelo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suelo, {
            title: 'NewSuelo',
            exclude: ['_id'],
          }),
        },
      },
    })
    suelo: Omit<Suelo, '_id'>,
  ): Promise<Suelo> {
    return this.sueloRepository.create(suelo);
  }

  @get('/suelos/count')
  @response(200, {
    description: 'Suelo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Suelo) where?: Where<Suelo>,
  ): Promise<Count> {
    return this.sueloRepository.count(where);
  }

  @get('/suelos')
  @response(200, {
    description: 'Array of Suelo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Suelo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Suelo) filter?: Filter<Suelo>,
  ): Promise<Suelo[]> {
    return this.sueloRepository.find(filter);
  }

  @patch('/suelos')
  @response(200, {
    description: 'Suelo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suelo, {partial: true}),
        },
      },
    })
    suelo: Suelo,
    @param.where(Suelo) where?: Where<Suelo>,
  ): Promise<Count> {
    return this.sueloRepository.updateAll(suelo, where);
  }

  @get('/suelos/{id}')
  @response(200, {
    description: 'Suelo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Suelo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Suelo, {exclude: 'where'}) filter?: FilterExcludingWhere<Suelo>
  ): Promise<Suelo> {
    return this.sueloRepository.findById(id, filter);
  }

  @patch('/suelos/{id}')
  @response(204, {
    description: 'Suelo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Suelo, {partial: true}),
        },
      },
    })
    suelo: Suelo,
  ): Promise<void> {
    await this.sueloRepository.updateById(id, suelo);
  }

  @put('/suelos/{id}')
  @response(204, {
    description: 'Suelo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() suelo: Suelo,
  ): Promise<void> {
    await this.sueloRepository.replaceById(id, suelo);
  }

  @del('/suelos/{id}')
  @response(204, {
    description: 'Suelo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.sueloRepository.deleteById(id);
  }
}
