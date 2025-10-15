import { HttpException, HttpStatus } from "@nestjs/common";

export class BussinessException extends HttpException {
    constructor(message: string) {
        super({ error: 'BussinessError', message }, HttpStatus.BAD_REQUEST)
    }
}