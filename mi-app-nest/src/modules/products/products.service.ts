import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { Product } from 'src/entities/product.entity';
import { IProducts } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(@InjectRepository(Product)
    private productsRepo: Repository<Product>) {}

    findAll() {
        return this.productsRepo.findBy({ status: true });
    }

    async findOne(id: number) {
        const productFind = await this.productsRepo.findOne({ where: { id }})
        if (!productFind) throw new NotFoundException('Producto no encontrado')
        return productFind
    }

    //Me devuelve un producto por su nombre
    findByName(name: string) {
        const productFind = this.productsRepo.findOne({ where: { name }});
        if (!productFind) throw new NotFoundException('Producto no encontrado');
        return productFind;
    }

    create(newProduct: CreateProductDTO) {
        const productCreated = this.productsRepo.create(newProduct);
        return this.productsRepo.save(productCreated);
        
    }

    async update(id: number, updateProduct: UpdateProductDTO) {
        await this.productsRepo.update(id, updateProduct);
        return this.findOne(id)
    }

    async disabled(id: number) {
        const productFind = await this.productsRepo.findOne({ where: { id }})

        if (!productFind){
            throw new NotFoundException("Producto no encontrado")
        }

        productFind.status = false;
        await this.productsRepo.save(productFind);

        return { message: `Producto ${id} desactivado correctamente`, productFind }
    }

}
