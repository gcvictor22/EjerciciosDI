import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
    constructor(private readonly userService : UsersService) {}
}
