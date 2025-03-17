import { DynamicModule, Module } from "@nestjs/common";
import { RequestLoggerOptions } from "src/types";
import { LoggerModule } from "./modules/logger.module";
import { RateLimitService } from "./services/rate-limit.service";
import { AppLoggerModule } from "./modules/app-logger.module";
import { AppLoggerService } from "./services/app-logger.service";
import { RateLimitModule } from "./modules/rate-limit.module";

@Module({})
export default class CommonModule {
    private static initialized = false;
    private static moduleRef: DynamicModule;

    static register(options?: RequestLoggerOptions): DynamicModule {
        if (this.initialized) {
            return this.moduleRef;
        }

        this.initialized = true;
        this.moduleRef = {
            module: CommonModule,
            imports: [
                LoggerModule.register(options),
                AppLoggerModule,
                RateLimitModule
            ],
            providers: [RateLimitService, AppLoggerService],
            exports: [RateLimitService, AppLoggerService]
        };

        return this.moduleRef;
    }
}