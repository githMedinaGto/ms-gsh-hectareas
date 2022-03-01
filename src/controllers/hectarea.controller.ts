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
import {Hectarea} from '../models';
import {HectareaRepository} from '../repositories';

export class HectareaController {
  constructor(
    @repository(HectareaRepository)
    public hectareaRepository : HectareaRepository,
  ) {}

  @post('/hectareas')
  @response(200, {
    description: 'Hectarea model instance',
    content: {'application/json': {schema: getModelSchemaRef(Hectarea)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hectarea, {
            title: 'NewHectarea',
            exclude: ['_id'],
          }),
        },
      },
    })
    hectarea: Omit<Hectarea, '_id'>,
  ): Promise<Hectarea> {
    return this.hectareaRepository.create(hectarea);
  }

  @get('/hectareas/count')
  @response(200, {
    description: 'Hectarea model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Hectarea) where?: Where<Hectarea>,
  ): Promise<Count> {
    return this.hectareaRepository.count(where);
  }

  @get('/hectareas')
  @response(200, {
    description: 'Array of Hectarea model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Hectarea, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Hectarea) filter?: Filter<Hectarea>,
  ): Promise<Hectarea[]> {
    return this.hectareaRepository.find(filter);
  }

  @patch('/hectareas')
  @response(200, {
    description: 'Hectarea PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hectarea, {partial: true}),
        },
      },
    })
    hectarea: Hectarea,
    @param.where(Hectarea) where?: Where<Hectarea>,
  ): Promise<Count> {
    return this.hectareaRepository.updateAll(hectarea, where);
  }

  @get('/hectareas/{id}')
  @response(200, {
    description: 'Hectarea model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Hectarea, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Hectarea, {exclude: 'where'}) filter?: FilterExcludingWhere<Hectarea>
  ): Promise<Hectarea> {
    return this.hectareaRepository.findById(id, filter);
  }

  @patch('/hectareas/{id}')
  @response(204, {
    description: 'Hectarea PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hectarea, {partial: true}),
        },
      },
    })
    hectarea: Hectarea,
  ): Promise<void> {
    await this.hectareaRepository.updateById(id, hectarea);
  }

  @put('/hectareas/{id}')
  @response(204, {
    description: 'Hectarea PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() hectarea: Hectarea,
  ): Promise<void> {
    await this.hectareaRepository.replaceById(id, hectarea);
  }

  @del('/hectareas/{id}')
  @response(204, {
    description: 'Hectarea DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.hectareaRepository.deleteById(id);
  }
}
