import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    encontrarTodos() {
        return this.productsService.findAll();
    }

    @Get(':id')
    encontrarUnoPorId(@Param('id') id: string) {
        return this.productsService.findOne(Number(id))
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    crear(@Body() body: CreateProductDTO) {
        return this.productsService.create(body);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    actualizar(@Param('id') id: string, @Body() body: UpdateProductDTO) {
        return this.productsService.update(Number(id), body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    borrar(@Param('id') id: string) {
        return this.productsService.remove(Number(id))
    }
}
