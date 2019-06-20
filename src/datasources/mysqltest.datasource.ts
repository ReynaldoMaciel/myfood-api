import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './mysqltest.datasource.json';

export class MysqltestDataSource extends juggler.DataSource {
  static dataSourceName = 'mysqltest';

  constructor(
    @inject('datasources.config.mysqltest', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
