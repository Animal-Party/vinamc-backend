import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '../../utils/HealthCheck';

/**
 * Controller for health-check endpoints
 */
@Controller('health')
export class HealthController {
    private healthCheck = HealthCheck.getInstance();

    /**
     * Basic health check endpoint
     */
    @Get()
    check() {
        return this.healthCheck.getStatus();
    }

    /**
     * Detailed health check with additional system information
     */
    @Get('details')
    details() {
        return this.healthCheck.getDetailedStatus();
    }

    /**
     * Simple ping endpoint for quick connectivity tests
     */
    @Get('ping')
    ping() {
        return { ping: 'pong', timestamp: new Date().toISOString() };
    }
}
