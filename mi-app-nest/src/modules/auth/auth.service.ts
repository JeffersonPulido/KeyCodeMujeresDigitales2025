import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    login(data: LoginDTO) {
        const users = this.usersService.findAll();
        const user = users.find(user => user.email === data.email && user.password === data.password)

        if (!user) {
            throw new UnauthorizedException("Credenciales invalidas");
        }

        return {
            user: { id: user.id, name: user.name, email: user.email },
            accessToken: `fake-token-${user.id}-${Date.now()}`
        }
    }
}
