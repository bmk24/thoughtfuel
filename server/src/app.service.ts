import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
    async getAll(): Promise<string> {
        return 'Hello World!'
    }
}