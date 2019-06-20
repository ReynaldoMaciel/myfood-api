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
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  Pedido,
} from '../models';
import {ClienteRepository} from '../repositories';

export class ClientePedidoController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
  ) { }

  @get('/clientes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido\'s belonging to Cliente',
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Pedido } },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return await this.clienteRepository.pedidos(id).find(filter);
  }

  @post('/clientes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Pedido } } },
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody() pedido: Pedido,
  ): Promise<Pedido> {
    return await this.clienteRepository.pedidos(id).create(pedido);
  }

  @patch('/clientes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Cliente.Pedido PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody() pedido: Partial<Pedido>,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return await this.clienteRepository.pedidos(id).patch(pedido, where);
  }

  @del('/clientes/{id}/pedidos', {
    responses: {
      '200': {
        description: 'Cliente.Pedido DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return await this.clienteRepository.pedidos(id).delete(where);
  }
}
