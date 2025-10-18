import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from 'src/dto/create-product.dto';
import { UpdateProductDTO } from 'src/dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ParseUpperTrimPipe } from 'src/common/pipes/parse-uppertrim.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('/api/products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos retornados desde BD' })
    encontrarTodos() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener el producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto retornado desde BD' })
    @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.USER)
    encontrarUnoPorId(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.findOne(id)
    }

    @Get('by-name/:name') //La ruta es http://localhost:3000/products/by-name/perro
    @ApiOperation({ summary: 'Obtener el producto por NOMBRE' })
    @ApiResponse({ status: 200, description: 'Producto retornado desde BD' })
    @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
    findByName(@Param('name', ParseUpperTrimPipe) name: string) {
        return this.productsService.findByName(name);
    }

    @Post()
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Crear un producto' })
    @ApiResponse({ status: 201, description: 'Producto creado exitosamente en BD' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    crear(@Body() body: CreateProductDTO) {
        return this.productsService.create(body);
    }

    @Put(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualiza un producto' })
    @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente en BD' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    actualizar(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDTO) {
        return this.productsService.update(id, body)
    }

    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Inactiva un producto' })
    @ApiResponse({ status: 200, description: 'Producto inactivado exitosamente en BD' })
    @ApiResponse({ status: 404, description: 'Producto NO encontrado desde BD' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    borrar(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.disabled(id)
    }
}
