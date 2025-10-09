import { Injectable, NotFoundException } from '@nestjs/common';
import { IProducts } from 'src/interfaces';

@Injectable()
export class ProductsService {
    private products: IProducts[] = [
        { id: 1, name: 'CARNE', description: 'Cerdito x lb', price: 15000 },
        { id: 2, name: 'POLLO', description: 'Alitas x lb', price: 20000 }
    ]

    findAll(): IProducts[] {
        return this.products
    }

    findOne(id: number): IProducts {
        const productFind = this.products.find((product) => product.id === id)
        if (!productFind) throw new NotFoundException('Producto no encontrado')
        return productFind
    }

    //Me devuelve un producto por su nombre
    findByName(name: string): IProducts {
        const productFind = this.products.find(
            (product) =>
                product.name === name,
        );
        if (!productFind) throw new NotFoundException('Producto no encontrado');
        return productFind;
    }

    create(product: Omit<IProducts, 'id'>): IProducts {
        const newId = this.products.length > 0
            ? this.products[this.products.length - 1].id + 1
            : 1;

        const newProduct: IProducts = {
            id: newId, ...product
        }

        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, newProduct: Omit<IProducts, 'id'>): IProducts {
        const product = this.findOne(id);
        Object.assign(product, newProduct)
        return product;
    }

    remove(id: number): void {
        const product = this.products.findIndex((product) => product.id === id);
        this.products.splice(product, 1)
    }

}
