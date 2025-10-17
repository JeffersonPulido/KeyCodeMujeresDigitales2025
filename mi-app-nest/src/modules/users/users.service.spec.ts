import { NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service"
import * as bcrypt from 'bcrypt';

const usersFake = [
    { id: 1, name: "Jefferson", email: "jp@gmail.com", password: '123123', role: 'admin' },
    { id: 2, name: "Pulido", email: "pulido@gmail.com", password: '123123', role: 'admin' }
]

jest.mock('bcrypt');

/**
 * A: Arrange - Organizar
 * A: Act - Actuar
 * A: Assert - Afirmar
 */

describe('UserService', () => {

    let service: UsersService;
    let fakeRepo;

    beforeEach(() => {
        jest.clearAllMocks();
        fakeRepo = {
            find: jest.fn().mockResolvedValue(usersFake),
            findOne: jest.fn().mockResolvedValue(usersFake),
            create: jest.fn().mockResolvedValue(usersFake),
            save: jest.fn().mockResolvedValue(usersFake),
            update: jest.fn().mockResolvedValue(usersFake),
            delete: jest.fn().mockResolvedValue(usersFake),
        };

        service = new UsersService(fakeRepo as any)
    })

    it('Deberia devolver todos los usuarios', async () => {
        const users = await service.findAll();
        expect(users.length).toBeGreaterThan(0);
        expect(fakeRepo.find).toHaveBeenCalled();
    })

    it('Deberia retornar un usuario por id', async () => {
        fakeRepo.findOne.mockResolvedValue(usersFake[0])
        const result = await service.findOne(1)
        expect(result.email).toEqual('jp@gmail.com')
    })

    it('Deberia lanzar NotFoundException si el usuario no existe', async () => {
        fakeRepo.findOne.mockResolvedValue(null)
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException)
    })

    it('Deberia crear un usuario', async () => {
        const newUserMock = { name: 'Carlos', email: 'carlito@gmail.com', password: '1234' }
        fakeRepo.save.mockResolvedValue({ id: 3, ...newUserMock })
        const result = await service.create(newUserMock as any)
        expect(result.id).toBe(3);
    })

    it('Deberia actualizar un usuario', async () => {
        const updatedUser = { id: 1, name: 'Jefferson Dev', role: "admin" }
        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue(updatedUser)

        const result = await service.update(1, { name: 'Jefferson Dev', role: "admin" })
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { name: 'Jefferson Dev', role: "admin" })
        expect(result.name).toEqual('Jefferson Dev')
    })

    it('Deberia actualizar un usuario y encriptar la nueva contraseña', async () => {
        const updatedUser = { id: 1, name: 'Jefferson Dev', role: "admin", password: 'newpass' };
        (bcrypt.hash as jest.Mock).mockResolvedValue('new_hashed_password');
        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue({ ...updatedUser, password: 'new_hashed_password' })

        const result = await service.update(1, updatedUser as any)
        expect(bcrypt.hash).toHaveBeenCalledWith('newpass', 10)
        expect(fakeRepo.update).toHaveBeenCalledWith(1, { ...updatedUser, password: 'new_hashed_password' })
        expect(result.password).toBe('new_hashed_password')
    })

    it('Deberia eliminar un usuario', async () => {
        fakeRepo.delete.mockResolvedValue({ affected: 1 })
        const result = await service.remove(1)
        expect(fakeRepo.delete).toHaveBeenCalledWith(1)
        expect(result).toEqual({ message: `El usuario con id 1 fue eliminado correctamente` })
    })


})
