import { Reflector } from "@nestjs/core";
import { RolesGuard } from "./roles.guard"
import { ForbiddenException } from "@nestjs/common";
import { BussinessException } from "src/common/exceptions/bussiness.exception";

describe('RolesGuard', () => {
    let guard: RolesGuard;
    let reflector: Reflector;

    beforeEach(() => {
        reflector = { getAllAndOverride: jest.fn() } as any;
        guard = new RolesGuard(reflector)
    })

    it('Debe permitir acceso si no se solicitan roles', () => {
        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(undefined)

        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({ user: { id: 1, role: 'admin' } }) })
        } as any;

        const result = guard.canActivate(context)
        expect(result).toBe(true)

    })

    it('Deberia lanzar ForbiddenException si el usuario no esta autenticado', () => {
        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])
        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({}) })
        } as any;

        expect(() => guard.canActivate(context)).toThrow(ForbiddenException)
    })

    it('Debe lanzar BussinessException si el rol no coincide con el requerido', () => {
        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])

        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({ user: { id: 1, role: 'user' } }) })
        } as any;

        expect(() => guard.canActivate(context)).toThrow(BussinessException)
    })

    it('Debe permitir el acceso si el rol coincide con el requerido', () => {
        (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin'])

        const context = {
            getHandler: jest.fn(),
            getClass: jest.fn(),
            switchToHttp: () => ({ getRequest: () => ({ user: { id: 1, role: 'admin' } }) })
        } as any;

        const result = guard.canActivate(context)
        expect(result).toBe(true)
    })
})