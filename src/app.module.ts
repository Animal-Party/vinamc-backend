import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './common/middlewares/request-logger.middleware';
import ModuleReflection from './utils/ModuleReflection';
import { RateLimitService } from './common/services/rate-limit.service';
import CommonModule from './common/index.module';

const modules = ModuleReflection();

@Module({
  imports: [
    CommonModule.register(),
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  constructor(private readonly rateLimitService: RateLimitService) {}
  
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
    consumer
      .apply(this.rateLimitService.getMiddleware())
      .exclude('health')
      .forRoutes('*');
  }
}
