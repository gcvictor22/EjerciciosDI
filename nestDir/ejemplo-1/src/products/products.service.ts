import { Injectable } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    getAllProducts(){
        return 'Este método devuelve todos los productos';
    }

    getProductsByName(name : string){
        return `Este método returna todos los productos filtrados por nombre según la query: ${name}`
    }

    getProductsById(id : string){
        return `Este método retorna el producto con id:${id}`;
    }

    createProduct(product : Product){
        console.log(product)
        return 'Este método crea un producto'
    }

    replaceProduct(product : Product, id : string){
        console.log(product)
        return `Este método actualiza el producto con id: ${id}`
    }

    updateProduct(product : Product, id : string){
        console.log(product)
        return `Este método actualiza un producto con id: ${id}`
    }

    deleteProduct(id : string){
        return `Este método elimina un producto con id: ${id}`
    }
}
