import { MiddlewareConsumer, Module, NestModule, UseGuards } from '@nestjs/common';
import ModuleReflection from './utils/ModuleReflection';
import { RateLimitService } from './common/services/rate-limit.service';
import CommonModule from './common/index.module';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';

/**
 * Main application module
 */
@Module({
    imports: [CommonModule.register(), ...ModuleReflection()],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    constructor(private readonly rateLimitService: RateLimitService) {}

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
        consumer
            .apply(this.rateLimitService.getMiddleware())
            .exclude('health')
            .forRoutes('*');
    }
}
