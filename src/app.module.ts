import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { AppLoggerModule } from './common/modules/logger.module';
import ModuleReflection from './utils/ModuleReflection';
import { RateLimitModule } from './middlewares/rate-limit.module';
import { RateLimitService } from './middlewares/rate-limit.service';

const modules = ModuleReflection();

@Module({
  imports: [
    AppLoggerModule,
    RateLimitModule,
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
      .forRoutes('*');
  }
}
