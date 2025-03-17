import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RequestLoggerMiddleware } from '../middlewares/request-logger.middleware';
import { RequestLoggerOptions } from '../../types/logger';

@Global()
@Module({
  providers: [RequestLoggerMiddleware],
  exports: [RequestLoggerMiddleware],
})
export class LoggerModule {
  static register(options?: RequestLoggerOptions): DynamicModule {
    const optionsProvider: Provider = {
      provide: 'REQUEST_LOGGER_OPTIONS',
      useValue: options || {},
    };

    return {
      module: LoggerModule,
      providers: [optionsProvider, RequestLoggerMiddleware],
      exports: [RequestLoggerMiddleware],
    };
  }
}
