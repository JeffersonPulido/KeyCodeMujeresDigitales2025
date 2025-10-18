import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UpdateUserDTO } from 'src/dto/update-user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>
    ) { }

    findAll() {
        return this.usersRepo.find();
    }

    /**
     * findOne: Method to find unique register to user repository
     * @typeParam id - { String } - Id for recognize user
     * @returns IUser - Unique register
    */

    async findOne(id: number) {
        const userFind = await this.usersRepo.findOne({ where: { id } })
        if (!userFind) throw new NotFoundException('Usuario no encontrado')
        return userFind
    }

    create(newUser: CreateUserDTO) {
        const userCreated = this.usersRepo.create(newUser);
        return this.usersRepo.save(userCreated);
    }

    async update(id: number, updateUser: UpdateUserDTO) {
        const dataToUpdate = { ...updateUser }
        let dataWithPassword;

        if (updateUser.password) {
            const hashedPassword = await bcrypt.hash(updateUser.password, 10)
            dataWithPassword = { ...dataToUpdate, password: hashedPassword }
        }

        await this.usersRepo.update(id, updateUser.password ? dataWithPassword : dataToUpdate);
        return this.findOne(id);
    }

    async remove(id: number) {
        const result = await this.usersRepo.delete(id)
        if (result.affected === 0) throw new NotFoundException(`Usuario con id ${id} no encontrado`)
        return { message: `El usuario con id ${id} fue eliminado correctamente` }
    }
}
