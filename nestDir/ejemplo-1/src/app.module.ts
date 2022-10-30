import { Module } from '@nestjs/common';
import { ProductsController } from './products/products.controller';
import { WarejousesController } from './warejouses/warejouses.controller';
import { ProvidersController } from "./providers/providers.controller";
import { ProductsService } from './products/products.service';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [ProductsController, WarejousesController, ProvidersController],
  providers: [ProductsService],
})
export class AppModule {}
