import { NestFactory } from '@nestjs/core';
import { AppModule } from 'app.module';
import { configService } from 'core/config/config.service';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  await app.listen(configService.getNumber('PORT') || 3000);
}
bootstrap();
