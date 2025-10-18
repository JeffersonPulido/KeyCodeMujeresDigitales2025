import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service"
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from "@nestjs/common";

jest.mock('bcrypt');

describe('AuthService', () => {
    let service: AuthService
    let fakeRepo: any;
    let jwtService: JwtService

    const userMock = {
        id: 1,
        name: 'Jefferson',
        email: 'jp@gmail.com',
        password: 'password123',
        role: 'admin'
    }

    beforeEach(() => {
        fakeRepo = {
            create: jest.fn(),
            save: jest.fn(),
            findOne: jest.fn()
        }

        jwtService = {
            signAsync: jest.fn()
        } as any;

        service = new AuthService(fakeRepo, jwtService)
    })

    it('Deberia registrar un usuario correctamente', async () => {
        const dto = { name: 'Jeff', email: 'test@gmail.com', password: '123456' };
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword')

        fakeRepo.create.mockReturnValue({ ...dto, password: 'hashedPassword' })
        fakeRepo.save.mockResolvedValue({ id: 1, ...dto, password: 'hashedPassword' })

        const result = await service.register(dto as any)

        expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10)
        expect(fakeRepo.create).toHaveBeenCalled()
        expect(fakeRepo.save).toHaveBeenCalled()
        expect(result).toEqual({
            message: 'Usuario registrado con exito',
            user: { id: undefined, email: dto.email }
        })
    })

    it('Deberia hacer login correctamente y retornar un token', async () => {
        const data = { email: 'jp@gmail.com', password: 'password123' };
        fakeRepo.findOne.mockResolvedValue(userMock);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwtService.signAsync as jest.Mock).mockResolvedValue('fake_token');

        const result = await service.login(data)

        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { email: data.email } })
        expect(bcrypt.compare).toHaveBeenCalled()
        expect(jwtService.signAsync).toHaveBeenCalled()
        expect(result).toEqual({ accessToken: 'fake_token' })
    })

    it('Deberia lanzar un UnauthorizedException si el email no existe', async () => {
        const data = { email: 'jp@gmail.com', password: 'password123' };
        fakeRepo.findOne.mockResolvedValue(null);
        await expect(service.login(data)).rejects.toThrow(UnauthorizedException)
    })

    it('Deberia lanzar un UnauthorizedException si la contraseña no coincide', async () => {
        const data = { email: 'jp@gmail.com', password: 'password123' };
        fakeRepo.findOne.mockResolvedValue(userMock);
        (bcrypt.compare as jest.Mock).mockResolvedValue(false);
        await expect(service.login(data)).rejects.toThrow(UnauthorizedException)
    })
})