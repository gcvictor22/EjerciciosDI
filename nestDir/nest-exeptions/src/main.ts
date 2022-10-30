import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GeneralExeptionFilter } from './filter/exceptions/general-exeption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GeneralExeptionFilter());
  await app.listen(3000);
}
bootstrap();
