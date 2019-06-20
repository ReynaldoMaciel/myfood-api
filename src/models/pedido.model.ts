import {Entity, model, property} from '@loopback/repository';

@model({settings: {}})
export class Pedido extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'number',
  })
  clienteId?: number;

  constructor(data?: Partial<Pedido>) {
    super(data);
  }
}

export interface PedidoRelations {
  // describe navigational properties here
}

export type PedidoWithRelations = Pedido & PedidoRelations;
