import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.usersService.findOne(Number(id))
    // }

    // @Post()
    // create(@Body() body: CreateUserDTO) {
    //     return this.usersService.create(body);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    //     return this.usersService.update(Number(id), body)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(Number(id))
    // }
}
