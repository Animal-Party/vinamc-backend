import { Controller, Get, Post } from '@nestjs/common';

@Controller('payment')
export default class PaymentController {
    @Post('create-payment')
    async createTransaction() {}
    @Get()
    test() {
        return 'concac';
    }

    @Get('get-payment/:id')
    async getTransaction() {}
}
