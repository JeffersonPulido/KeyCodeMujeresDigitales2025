import { RolesEnum } from "src/entities/user.entity"
import { Roles } from "../auth/roles.decorator"
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { NotFoundException } from "@nestjs/common"

const usersFake = [
    { id: 1, name: "Jefferson", email: "jp@gmail.com", password: '123123', role: RolesEnum.ADMIN },
    { id: 2, name: "Pulido", email: "pulido@gmail.com", password: '123123', role: RolesEnum.ADMIN }
]

describe('UsersController', () => {
    let controller: UsersController
    let service: jest.Mocked<UsersService>

    beforeEach(() => {
        service = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
        } as any

        controller = new UsersController(service)
    })

    it('Deberia devolver todos los usuarios', async () => {
        service.findAll.mockResolvedValue(usersFake);
        const users = await controller.findAll();

        expect(users.length).toBeGreaterThan(0);
        expect(users).toEqual(usersFake);
    })

    it('Deberia retornar un usuario por id', async () => {
        service.findOne.mockResolvedValue(usersFake[0])
        const result = await controller.findOne(1)
        expect(result.email).toEqual('jp@gmail.com')
    })

    it('Deberia crear un usuario', async () => {
        const newUserMock = { name: 'Carlos', email: 'carlito@gmail.com', password: '1234', role: RolesEnum.USER }
        service.create.mockResolvedValue({ id: 3, ...newUserMock })

        const result = await controller.create(newUserMock as any)
        expect(service.create).toHaveBeenCalledWith(newUserMock)
        expect(result.id).toBe(3);
    })

    it('Deberia actualizar un usuario', async () => {
        const updatedUser = { name: 'Jefferson Dev', email: "JPP@GMAIL.COM", password: '', role: RolesEnum.ADMIN }
        service.update.mockResolvedValue({ id: 1, ...updatedUser })

        const result = await controller.update(1, updatedUser)
        expect(service.update).toHaveBeenCalledWith(1, updatedUser)
        expect(result.name).toEqual('Jefferson Dev')
    })

    it('Deberia eliminar un usuario', async () => {
        service.remove.mockResolvedValue({ message: `El usuario con id 2 fue eliminado correctamente` })
        const result = await controller.remove(2)
        expect(result).toEqual({ message: `El usuario con id 2 fue eliminado correctamente` })
        expect(service.remove).toHaveBeenCalledWith(2)
    })

    it('Deberia lanzar NotFoundException si el servicio lanza la excepcion', async () => {
        service.findOne.mockRejectedValue(new NotFoundException())
        await expect(controller.findOne(99)).rejects.toThrow(NotFoundException)
    })
})