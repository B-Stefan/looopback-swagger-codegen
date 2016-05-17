import loopback from "loopback"

export function createLoopbackAppWithModel(apiRoot) {
  var app = loopback();

  app.dataSource('db', { connector: 'memory' });

  var Product = loopback.createModel('Product', {
    foo: { type: 'string', required: true },
    bar: 'string',
    aNum: { type: 'number', min: 1, max: 10, required: true, default: 5 },
  }, { description: ['a-description', 'line2']  });
  app.model(Product, { dataSource: 'db' });

  // Simulate a restApiRoot set in config
  app.set('restApiRoot', apiRoot || '/api');
  app.use(app.get('restApiRoot'), loopback.rest());
  app.emit('started');

  return app;
}
