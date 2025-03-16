import { Module } from "@nestjs/common";
import { RateLimitMiddleware, RATE_LIMIT_OPTIONS } from "./rate-limit.middleware";
import { AppLoggerModule } from "src/common/modules/logger.module";
import { RateLimitService } from "./rate-limit.service";

@Module({
    imports: [AppLoggerModule],
    providers: [
        RateLimitMiddleware,
        RateLimitService,
        {
            provide: RATE_LIMIT_OPTIONS,
            useValue: { limit: 50, windowMs: 60000 },
        },
    ],
    exports: [RateLimitMiddleware, RateLimitService],
})
export class RateLimitModule {}