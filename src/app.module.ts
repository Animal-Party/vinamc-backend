import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { AppLoggerModule } from './common/modules/logger.module';
import ModuleReflection from './utils/ModuleReflection';

const modules = ModuleReflection();

@Module({
  imports: [
    AppLoggerModule,
    ...modules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
