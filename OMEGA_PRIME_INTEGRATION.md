# Omega Prime Integration Guide

## Overview

Pizza Express has been integrated with the Omega Prime (Ω Prime) operational intelligence system (v25-35). This integration provides telemetry, health monitoring, and operational metrics capabilities aligned with the Unified Golden Operator specifications.

## Integration Components

### 1. Health Check Endpoint

**Endpoint**: `GET /api/v1/health`

Returns the current health status of the Pizza Express application.

**Response Example**:
```json
{
  "status": "operational",
  "system": "Pizza Express",
  "omega_prime_version": "v25-35",
  "uptime_ms": 13169,
  "uptime_seconds": 13,
  "timestamp": "2025-11-22T21:48:13.659Z",
  "components": {
    "server": "healthy",
    "data_store": "healthy"
  }
}
```

### 2. Metrics Endpoint

**Endpoint**: `GET /api/v1/metrics`

Returns operational metrics including performance, business, and resource metrics.

**Response Example**:
```json
{
  "system": "Pizza Express",
  "omega_prime_version": "v25-35",
  "timestamp": "2025-11-22T21:48:18.876Z",
  "uptime_ms": 18386,
  "uptime_seconds": 18,
  "metrics": {
    "performance": {
      "total_requests": 2,
      "requests_per_second": "0.11",
      "error_count": 0,
      "error_rate_percentage": "0.00"
    },
    "business": {
      "pizzas_created": 0,
      "pizzas_viewed": 0,
      "total_pizzas": 0
    },
    "resources": {
      "memory_usage_mb": "7.00",
      "memory_total_mb": "8.23"
    }
  }
}
```

### 3. Status Endpoint

**Endpoint**: `GET /api/v1/status`

Returns the integration status and operational mode.

**Response Example**:
```json
{
  "system": "Pizza Express",
  "omega_prime_integration": true,
  "version": "v25-35",
  "status": "operational",
  "mode": "full-cascade",
  "timestamp": "2025-11-22T21:48:24.412Z"
}
```

## Metrics Collected

### Performance Metrics
- **Total Requests**: Count of all HTTP requests received
- **Requests Per Second**: Average throughput
- **Error Count**: Number of errors encountered
- **Error Rate**: Percentage of requests that resulted in errors

### Business Metrics
- **Pizzas Created**: Total number of pizzas created
- **Pizzas Viewed**: Total number of times pizzas were viewed
- **Total Pizzas**: Current count of pizzas in the system

### Resource Metrics
- **Memory Usage**: Current heap memory usage in MB
- **Memory Total**: Total heap memory allocated in MB

## Alignment with Omega Prime

This integration aligns with the Omega Prime v25-35 specifications:

- **Telemetry Collection**: Metrics are collected continuously
- **Health Monitoring**: Component health status is tracked
- **Operational Status**: System status follows Omega Prime conventions
- **API Standards**: Endpoints follow the `/api/v1/` convention

## Usage Examples

### Check Application Health
```bash
curl http://localhost:3000/api/v1/health
```

### Get Current Metrics
```bash
curl http://localhost:3000/api/v1/metrics
```

### Check Integration Status
```bash
curl http://localhost:3000/api/v1/status
```

### Monitor Metrics Over Time
```bash
# Check metrics every 60 seconds
watch -n 60 'curl -s http://localhost:3000/api/v1/metrics | python3 -m json.tool'
```

## Integration with External Systems

These endpoints can be integrated with:

- **Monitoring Platforms**: For observability and alerting
- **Ticketing Systems**: For incident management
- **Data Warehouses**: For analytics and reporting
- **Communication Platforms**: For notifications

## Configuration

No additional configuration is required. The integration is enabled by default when the application starts.

The metrics collection begins at application startup and tracks:
- Application uptime
- Request counts
- Business operations (pizza creation/viewing)
- Resource utilization

## Testing

Run the test suite to verify the integration:

```bash
npm test
```

The test suite includes:
- Health endpoint validation
- Metrics endpoint validation
- Status endpoint validation
- Data structure verification

## Further Reading

For more information about the Omega Prime system:

- **Main Configuration**: `seeds/unified-golden-operator-v25-35.yaml`
- **System Documentation**: `seeds/docs/README.md`
- **Architecture Diagrams**: `seeds/docs/diagrams/architecture.md`
- **Quick Reference**: `seeds/docs/QUICK_REFERENCE.md`
- **Implementation Summary**: `seeds/IMPLEMENTATION_SUMMARY.md`

## Operational Excellence

This integration supports the Omega Prime SRE principles:

1. **Embrace Risk**: Minimal changes to reduce integration risk
2. **Service Level Objectives**: Metrics enable SLO definition and tracking
3. **Eliminate Toil**: Automated metrics collection
4. **Monitor Distributed Systems**: Standard health and metrics endpoints
5. **Automation**: Ready for integration with automated monitoring
6. **Simplicity**: Simple, focused API design

## Version Information

- **Omega Prime Version**: v25-35
- **Integration Mode**: Full-Cascade
- **API Version**: v1
- **Status**: Operational
