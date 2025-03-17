import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';

/**
 * Module for health monitoring functionality
 */
@Module({
    controllers: [HealthController],
    providers: [],
    exports: [],
})
export class HealthModule {}
