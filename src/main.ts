import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  /**
   * Swagger
   */
  const config = new DocumentBuilder()
    .setTitle('Teslo Shop')
    .setDescription('The Teslo API description')
    .setVersion('1.0')
    .addTag('Teslo')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /**
   * Configuración global de la aplicación
   */

  await app
    .use(morgan('dev'))
    .setGlobalPrefix('api')
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    .listen(process.env.PORT || 3000);
  logger.log(`Application running on port ${process.env.PORT}`);
}
bootstrap();
