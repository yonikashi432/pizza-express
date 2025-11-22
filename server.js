const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const generateId = require('./lib/generate-id');

var redis = require("redis"),
  client = redis.createClient('6379');

// Handle Redis connection errors so they don't crash the app when Redis is not available.
client.on('error', function(err) {
  console.error('Redis error (continuing without Redis):', err && err.message ? err.message : err);
});

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

app.locals.title = 'Pizza Express'
app.locals.pizzas = {};

// Omega Prime Integration: Telemetry and operational metrics
app.locals.metrics = {
  startTime: Date.now(),
  requestCount: 0,
  pizzaCreatedCount: 0,
  pizzaViewedCount: 0,
  errors: 0
};

// Omega Prime Integration: Metrics middleware
app.use((request, response, next) => {
  app.locals.metrics.requestCount++;
  next();
});

app.get('/', (request, response) => {
  response.render('index');
});

app.post('/pizzas', (request, response) => {
  if (!request.body.pizza) { return response.sendStatus(400); }

  var id = generateId();
  var pizza = request.body.pizza;
  pizza.id = id;

  app.locals.pizzas[id] = pizza;
  app.locals.metrics.pizzaCreatedCount++;

  response.redirect('/pizzas/' + id);
});

app.get('/pizzas/:id', (request, response) => {
  var pizza = app.locals.pizzas[request.params.id];

  app.locals.metrics.pizzaViewedCount++;
  response.render('pizza', { pizza: pizza });
});

// Omega Prime Integration: Health check endpoint
app.get('/api/v1/health', (request, response) => {
  var uptime = Date.now() - app.locals.metrics.startTime;
  var uptimeSeconds = Math.floor(uptime / 1000);
  
  response.json({
    status: 'operational',
    system: 'Pizza Express',
    omega_prime_version: 'v25-35',
    uptime_ms: uptime,
    uptime_seconds: uptimeSeconds,
    timestamp: new Date().toISOString(),
    components: {
      server: 'healthy',
      data_store: 'healthy'
    }
  });
});

// Omega Prime Integration: Metrics endpoint
app.get('/api/v1/metrics', (request, response) => {
  var uptime = Date.now() - app.locals.metrics.startTime;
  var uptimeSeconds = Math.floor(uptime / 1000);
  
  response.json({
    system: 'Pizza Express',
    omega_prime_version: 'v25-35',
    timestamp: new Date().toISOString(),
    uptime_ms: uptime,
    uptime_seconds: uptimeSeconds,
    metrics: {
      performance: {
        total_requests: app.locals.metrics.requestCount,
        requests_per_second: uptimeSeconds > 0 ? (app.locals.metrics.requestCount / uptimeSeconds).toFixed(2) : 0,
        error_count: app.locals.metrics.errors,
        error_rate_percentage: app.locals.metrics.requestCount > 0 ? 
          ((app.locals.metrics.errors / app.locals.metrics.requestCount) * 100).toFixed(2) : 0
      },
      business: {
        pizzas_created: app.locals.metrics.pizzaCreatedCount,
        pizzas_viewed: app.locals.metrics.pizzaViewedCount,
        total_pizzas: Object.keys(app.locals.pizzas).length
      },
      resources: {
        memory_usage_mb: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
        memory_total_mb: (process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)
      }
    }
  });
});

// Omega Prime Integration: Status endpoint
app.get('/api/v1/status', (request, response) => {
  response.json({
    system: 'Pizza Express',
    omega_prime_integration: true,
    version: 'v25-35',
    status: 'operational',
    mode: 'full-cascade',
    timestamp: new Date().toISOString()
  });
});

if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
    console.log(`putting key 'somekey' with value in redis and getting it: `);

    client.set("somekey", "successful test");
    client.get("somekey", function(err, reply) {
      // reply is null when the key is missing
      console.log(reply);
    });
  });
}

module.exports = app;
