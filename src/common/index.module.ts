import { DynamicModule, Module } from "@nestjs/common";
import { RequestLoggerOptions } from "src/types";
import { LoggerModule } from "./modules/logger.module";
import { RateLimitService } from "./services/rate-limit.service";
import { AppLoggerModule } from "./modules/app-logger.module";
import { AppLoggerService } from "./services/app-logger.service";
import { RateLimitModule } from "./modules/rate-limit.module";

@Module({})
export default class CommonModule {
    static register(options?: RequestLoggerOptions): DynamicModule {

        return {
            module: CommonModule,
            imports: [
                LoggerModule.register(options),
                AppLoggerModule,
                RateLimitModule
            ],
            providers: [RateLimitService, AppLoggerService],
            exports: [RateLimitService, AppLoggerService]
        };
    }
}