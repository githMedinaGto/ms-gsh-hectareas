import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parcela} from './parcela.model';

@model()
export class Suelo extends Entity {
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
  CapacidadCampo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Tratado: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  plaga: boolean;

  @property({
    type: 'boolean',
    required: true,
  })
  regado: boolean;

  @property({
    type: 'string',
  })
  nombrePlaga?: string;

  @belongsTo(() => Parcela)
  parcelaId: string;

  constructor(data?: Partial<Suelo>) {
    super(data);
  }
}

export interface SueloRelations {
  // describe navigational properties here
}

export type SueloWithRelations = Suelo & SueloRelations;
