import { Controller,Get } from '@nestjs/common';
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private AppService: appService){}

    @Get()
    async getAll(): Promise<string> {
        return this.appService.getAll();
    }
}