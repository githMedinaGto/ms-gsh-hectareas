import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parcela} from './parcela.model';

@model()
export class Estacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  clima: string;

  @property({
    type: 'boolean',
    required: true,
  })
  favorable: boolean;

  @belongsTo(() => Parcela)
  parcelaId: string;

  constructor(data?: Partial<Estacion>) {
    super(data);
  }
}

export interface EstacionRelations {
  // describe navigational properties here
}

export type EstacionWithRelations = Estacion & EstacionRelations;
