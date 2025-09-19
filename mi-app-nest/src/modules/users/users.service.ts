import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, IProducts } from 'src/interfaces';

@Injectable()
export class UsersService {

    private users: IUser[] = [
        { id: 1, name: 'Elena', email: 'elena@gmail.com' },
        { id: 2, name: 'Jefferson', email: 'pulido@gmail.com' }
    ]

    findAll(): IUser[] {
        return this.users
    }

    findOne(id: number): IUser {
        const userFind = this.users.find((user) => user.id === id)
        if (!userFind) throw new NotFoundException('Usuario no encontrado')
        return userFind
    }

    create(user: Omit<IUser, 'id'>): IUser {
        const newId = this.users.length > 0
            ? this.users[this.users.length - 1].id + 1
            : 1;

        const newUser: IUser = {
            id: newId, ...user
        };

        this.users.push(newUser);
        return newUser;
    }

    update(id: number, newUser: Omit<IUser, 'id'>): IUser {
        const user = this.findOne(id);
        Object.assign(user, newUser);
        return user;
    }

    remove(id: number) {
        const user = this.users.findIndex((user) => user.id === id);
        this.users.splice(user, 1)
        return { delete: true }
    }

}
