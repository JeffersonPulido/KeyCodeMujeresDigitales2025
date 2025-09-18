import { Injectable, NotFoundException } from '@nestjs/common';

export type IUser = { id: number, name: string, email: string }

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

}
