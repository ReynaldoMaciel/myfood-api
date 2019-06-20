import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Cliente, ClienteRelations, Pedido} from '../models';
import {MysqltestDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PedidoRepository} from './pedido.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly pedidos: HasManyRepositoryFactory<Pedido, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysqltest') dataSource: MysqltestDataSource, @repository.getter('PedidoRepository') protected pedidoRepositoryGetter: Getter<PedidoRepository>,
  ) {
    super(Cliente, dataSource);
    this.pedidos = this.createHasManyRepositoryFactoryFor('pedidos', pedidoRepositoryGetter,);
  }
}
