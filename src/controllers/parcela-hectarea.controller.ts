import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Parcela,
  Hectarea,
} from '../models';
import {ParcelaRepository} from '../repositories';

export class ParcelaHectareaController {
  constructor(
    @repository(ParcelaRepository) protected parcelaRepository: ParcelaRepository,
  ) { }

  @get('/parcelas/{id}/hectareas', {
    responses: {
      '200': {
        description: 'Array of Parcela has many Hectarea',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Hectarea)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Hectarea>,
  ): Promise<Hectarea[]> {
    return this.parcelaRepository.estaAsociado(id).find(filter);
  }

  @post('/parcelas/{id}/hectareas', {
    responses: {
      '200': {
        description: 'Parcela model instance',
        content: {'application/json': {schema: getModelSchemaRef(Hectarea)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parcela.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hectarea, {
            title: 'NewHectareaInParcela',
            exclude: ['_id'],
            optional: ['parcelaId']
          }),
        },
      },
    }) hectarea: Omit<Hectarea, '_id'>,
  ): Promise<Hectarea> {
    return this.parcelaRepository.estaAsociado(id).create(hectarea);
  }

  @patch('/parcelas/{id}/hectareas', {
    responses: {
      '200': {
        description: 'Parcela.Hectarea PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Hectarea, {partial: true}),
        },
      },
    })
    hectarea: Partial<Hectarea>,
    @param.query.object('where', getWhereSchemaFor(Hectarea)) where?: Where<Hectarea>,
  ): Promise<Count> {
    return this.parcelaRepository.estaAsociado(id).patch(hectarea, where);
  }

  @del('/parcelas/{id}/hectareas', {
    responses: {
      '200': {
        description: 'Parcela.Hectarea DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Hectarea)) where?: Where<Hectarea>,
  ): Promise<Count> {
    return this.parcelaRepository.estaAsociado(id).delete(where);
  }
}
