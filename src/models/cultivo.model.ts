import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Parcela} from './parcela.model';

@model()
export class Cultivo extends Entity {
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
  nombreCultivo: string;

  @property({
    type: 'string',
    required: true,
  })
  duraccionCultivo: string;

  @belongsTo(() => Parcela)
  parcelaId: string;

  constructor(data?: Partial<Cultivo>) {
    super(data);
  }
}

export interface CultivoRelations {
  // describe navigational properties here
}

export type CultivoWithRelations = Cultivo & CultivoRelations;
