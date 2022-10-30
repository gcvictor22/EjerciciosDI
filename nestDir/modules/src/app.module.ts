import { Module } from '@nestjs/common';
import { WorehouseModule } from './warehouse/warehouse.module';

@Module({
  imports: [WorehouseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}