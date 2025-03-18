import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    ValidationPipe,
    INestApplication,
    ConsoleLogger,
} from '@nestjs/common';
import { AppLoggerService } from './common/services/app-logger.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import './types';
import ApiKeyGuard from './common/guards/api-key.guard';
import { config } from 'dotenv';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
        logger: new ConsoleLogger({
            prefix: 'VinaMC',
        }),
    });

    const logger = app.get(AppLoggerService);
    logger.initPerformanceMonitoring();

    setupMiddleware(app);
    setupGlobalPipes(app);
    setupGracefulShutdown(app, logger);
    setupGlobalGuards(app);

    setUpEnvironment();

    const port = process.env.PORT || 3000;
    await app.listen(port);

    logger.logStartup(+port, process.env.NODE_ENV || 'development');
}

function setupMiddleware(app: INestApplication) {
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
}

function setupGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
            forbidNonWhitelisted: true,
        }),
    );
}

function setupGlobalGuards(app: INestApplication) {
    app.useGlobalGuards(new ApiKeyGuard());
}

function setupGracefulShutdown(
    app: INestApplication,
    logger: AppLoggerService,
) {
    const signals = ['SIGTERM', 'SIGINT'];

    signals.forEach((signal) => {
        process.on(signal, async () => {
            logger.logShutdown(signal);

            await app.close();

            process.exit(0);
        });
    });

    process.on('uncaughtException', (error) => {
        logger.logUnhandledException(error);
    });

    process.on('unhandledRejection', (reason) => {
        const error =
            reason instanceof Error ? reason : new Error(String(reason));
        logger.logUnhandledException(error);
    });
}

function setUpEnvironment() { 
    if (process.env.NODE_ENV === 'development') config();
}

bootstrap();
