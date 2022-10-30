import { Module } from '@nestjs/common';
import { ProductsController } from 'src/warehouse/products/products.controller';
import { UsersModule } from '../users/users.module';
import { ProductsService } from './products.service';

@Module({
    imports:[UsersModule],
    controllers:[ProductsController],
    providers:[ProductsService]
})
export class ProductsModule {}
