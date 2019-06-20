import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Pedido} from '../models';
import {PedidoRepository} from '../repositories';

export class PedidoController {
  constructor(
    @repository(PedidoRepository)
    public pedidoRepository : PedidoRepository,
  ) {}

  @post('/pedidos', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: {'x-ts-type': Pedido}}},
      },
    },
  })
  async create(@requestBody() pedido: Pedido): Promise<Pedido> {
    return await this.pedidoRepository.create(pedido);
  }

  @get('/pedidos/count', {
    responses: {
      '200': {
        description: 'Pedido model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return await this.pedidoRepository.count(where);
  }

  @get('/pedidos', {
    responses: {
      '200': {
        description: 'Array of Pedido model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Pedido}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Pedido)) filter?: Filter<Pedido>,
  ): Promise<Pedido[]> {
    return await this.pedidoRepository.find(filter);
  }

  @patch('/pedidos', {
    responses: {
      '200': {
        description: 'Pedido PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() pedido: Pedido,
    @param.query.object('where', getWhereSchemaFor(Pedido)) where?: Where<Pedido>,
  ): Promise<Count> {
    return await this.pedidoRepository.updateAll(pedido, where);
  }

  @get('/pedidos/{id}', {
    responses: {
      '200': {
        description: 'Pedido model instance',
        content: {'application/json': {schema: {'x-ts-type': Pedido}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Pedido> {
    return await this.pedidoRepository.findById(id);
  }

  @patch('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.updateById(id, pedido);
  }

  @put('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pedido: Pedido,
  ): Promise<void> {
    await this.pedidoRepository.replaceById(id, pedido);
  }

  @del('/pedidos/{id}', {
    responses: {
      '204': {
        description: 'Pedido DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pedidoRepository.deleteById(id);
  }
}
