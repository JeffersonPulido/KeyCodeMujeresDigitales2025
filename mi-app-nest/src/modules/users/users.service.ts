import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { IUser } from 'src/interfaces';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepo: Repository<User>
    ) {}

    findAll() {
        return this.usersRepo.find();
    }

    // findOne(id: number): IUser {
    //     const userFind = this.users.find((user) => user.id === id)
    //     if (!userFind) throw new NotFoundException('Usuario no encontrado')
    //     return userFind
    // }

    // create(user: Omit<IUser, 'id'>): IUser {
    //     const newId = this.users.length > 0
    //         ? this.users[this.users.length - 1].id + 1
    //         : 1;

    //     if (user.age && user.age >= 18) {
    //         const newUser: IUser = {
    //             id: newId, ...user
    //         };
    
    //         this.users.push(newUser);
    //         return newUser;
    //     }

    //     throw new BadRequestException('El usuario debe ser mayor de edad')

    // }

    // update(id: number, newUser: Omit<IUser, 'id'>): IUser {
    //     const user = this.findOne(id);
    //     Object.assign(user, newUser);
    //     return user;
    // }

    // remove(id: number) {
    //     const user = this.users.findIndex((user) => user.id === id);
    //     this.users.splice(user, 1)
    //     return { delete: true }
    // }

}
