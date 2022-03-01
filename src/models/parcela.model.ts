import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Hectarea} from './hectarea.model';

@model()
export class Parcela extends Entity {
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
  nombreParcela: string;

  @property({
    type: 'string',
  })
  cordenadas?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSiembra: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @belongsTo(() => Hectarea)
  hectareaId: string;

  @hasMany(() => Hectarea)
  estaAsociado: Hectarea[];

  constructor(data?: Partial<Parcela>) {
    super(data);
  }
}

export interface ParcelaRelations {
  // describe navigational properties here
}

export type ParcelaWithRelations = Parcela & ParcelaRelations;
