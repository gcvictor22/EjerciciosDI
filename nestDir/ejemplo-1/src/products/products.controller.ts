import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService : ProductsService) {}

    @Get()
    getAllProducts(@Query('name') name :string){
        if (name) {
            return this.productsService.getProductsByName(name);
        }
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductsById(@Param('id') id : string){
        return this.productsService.getProductsById(id);
    }

    @Post()
    createProduct(@Body() product : Product){
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    replaceProduct(@Body() product : Product, @Param('id') id : string){
        return this.productsService.replaceProduct(product, id);
    }

    @Patch(':id')
    updateProduct(@Body() product : Product, @Param('id') id : string){
        return this.productsService.updateProduct(product, id);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id : string){
        return this.productsService.deleteProduct(id);
    }
}
