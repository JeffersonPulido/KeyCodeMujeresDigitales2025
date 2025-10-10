import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesEnum } from 'src/entities/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @Roles(RolesEnum.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @Roles(RolesEnum.ADMIN)
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }

    @Post()
    @Roles(RolesEnum.ADMIN)
    create(@Body() body: CreateUserDTO) {
        return this.usersService.create(body);
    }

    @Put(':id')
    @Roles(RolesEnum.ADMIN)
    update(@Param('id',ParseIntPipe) id: number, @Body() body: UpdateUserDTO) {
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    @Roles(RolesEnum.ADMIN)
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id)
    }
}
