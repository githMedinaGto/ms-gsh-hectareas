import {Entity, model, property} from '@loopback/repository';

@model()
export class Hectarea extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'number',
    required: true,
  })
  numero: number;

  @property({
    type: 'string',
  })
  parcelaId?: string;

  constructor(data?: Partial<Hectarea>) {
    super(data);
  }
}

export interface HectareaRelations {
  // describe navigational properties here
}

export type HectareaWithRelations = Hectarea & HectareaRelations;
