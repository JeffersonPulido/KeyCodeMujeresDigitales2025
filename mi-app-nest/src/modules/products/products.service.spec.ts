import { stat } from "fs";
import { ProductsService } from "./products.service"

describe('ProductService', () => {
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