import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/dto/login.dto';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private jwtService: JwtService,
    ) { }

    private blackList: string[] = [];

    async register(data: CreateUserDTO) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userCreated = this.userRepo.create({ ...data, password: hashedPassword });
        await this.userRepo.save(userCreated);
        return { message: 'Usuario registrado con exito', user: { id: userCreated.id, email: userCreated.email } }
    }

    async login(data: LoginDTO) {
        const user = await this.userRepo.findOne({ where: { email: data.email } })

        if (!user) {
            throw new UnauthorizedException("Credenciales invalidas - EMAIL");
        }
        //ABC123456 === $2b$10$JnrEZPiYfIqMycBVLrSmZ.6WnNv0EwL5UTBKuIbbWEKcLiqCUojNy
        const isPasswordValid = await bcrypt.compare(data.password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException("Credenciales invalidas - PASSWORD");
        }

        const payloadToken = { sub: user.id, name: user.name, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payloadToken);

        return { accessToken: token }
    }

    async logout(token: string) {
        this.blackList.push(token)
        return { message: 'Sesion cerrada' }
    }

    isTokenBlacklistend(token: string): boolean {
        return this.blackList.includes(token)
    }
}
