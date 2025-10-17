import { NotFoundException } from "@nestjs/common";
import { ProductsService } from "./products.service"

const mockProducts = [
    { id: 1, name: "balon", price: 50000, description: "balon futbol", stock: 23, status: true },
    { id: 2, name: "guantes", price: 20000, description: "guantes box", stock: 23, status: true }
]

/**
 * A: Arrange - Organizar
 * A: Act - Actuar
 * A: Assert - Afirmar
 */

fdescribe('ProductService', () => {
    let service: ProductsService;
    let fakeRepo: any;

    beforeEach(() => {
        jest.clearAllMocks();

        fakeRepo = {
            findBy: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
        }

        service = new ProductsService(fakeRepo)
    })

    it('Deberia retornar todos los productos', async () => {
        fakeRepo.findBy.mockResolvedValue(mockProducts)
        const result = await service.findAll();

        expect(fakeRepo.findBy).toHaveBeenCalledWith({ status: true })
        expect(result[0].name).toEqual("balon")
        expect(result[1].name).toEqual("guantes")
    })

    it('Deberia retornar un producto por ID', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(mockProducts[0])
        //Actuar
        const result = await service.findOne(1)
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { id: 1 } })
        expect(result.name).toEqual("balon")
    })

    it('Deberia lanzar una excepcion si no encuentra el producto', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(null)
        //Actuar
        //Afirmar
        await expect(service.findOne(99)).rejects.toThrow(NotFoundException)
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { id: 99 } })
    })

    it('Deberia retornar un producto por name', async () => {
        //Organizar
        fakeRepo.findOne.mockResolvedValue(mockProducts[1])
        //Actuar
        const result = await service.findByName("guantes")
        //Afirmar
        expect(fakeRepo.findOne).toHaveBeenLastCalledWith({ where: { name: "guantes" } })
        expect(result?.price).toBe(20000)
    })

    it('Deberia crear un producto correctamente', async () => {
        const newProduct = { name: 'Botines', description: 'Botines para mujer', price: 250000 }
        const savedProduct = { id: 3, status: true, ...newProduct }

        fakeRepo.create.mockReturnValue(newProduct)
        fakeRepo.save.mockResolvedValue(savedProduct)

        const result = await service.create(newProduct as any)

        expect(fakeRepo.create).toHaveBeenCalledWith(newProduct)
        expect(fakeRepo.save).toHaveBeenCalledWith(newProduct)
        expect(result).toEqual(savedProduct)

    })

    it('Deberia actualzar un producto y retornar el producto actualizado', async () => {
        const updateData = { name: 'Balon Champions', price: 600000 }
        const updatedData = { id: 1, status: true, ...updateData }

        fakeRepo.update.mockResolvedValue({ affected: 1 })
        fakeRepo.findOne.mockResolvedValue(updatedData)

        const result = await service.update(1, updateData);

        expect(fakeRepo.update).toHaveBeenCalledWith(1, updateData)
        expect(result).toEqual(updatedData)
    })

    it('Deberia desactivar un producto correctamente', async () => {
        const product = { id: 2, name: 'Guantes', status: true };

        fakeRepo.findOne.mockResolvedValue(product);
        fakeRepo.save.mockResolvedValue({ ...product, status: false })

        const result = await service.disabled(2)

        expect(fakeRepo.findOne).toHaveBeenCalledWith({ where: { id: 2 } })
        expect(fakeRepo.save).toHaveBeenCalledWith({ ...product, status: false })
        expect(result).toEqual({
            message: `Producto 2 desactivado correctamente`,
            productFind: { ...product, status: false }
        })
    })
})