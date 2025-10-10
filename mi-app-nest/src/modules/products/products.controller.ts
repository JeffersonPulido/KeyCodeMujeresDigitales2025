import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    encontrarTodos() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    encontrarUnoPorId(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id)
    }

    @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
    findByName(@Param('name', ParseUpperTrimPipe) name: string) {
        return this.productsService.findByName(name);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    crear(@Body() body: CreateProductDTO) {
        return this.productsService.create(body);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    actualizar(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
        return this.productsService.update(id, body)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    borrar(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.disabled(id)
    }
}
