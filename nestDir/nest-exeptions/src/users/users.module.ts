import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { APP_FILTER } from '@nestjs/core';
import { GeneralExeptionFilter } from 'src/filter/exceptions/general-exeption.filter';

@Module({
  controllers: [UsersController],
  providers: [UsersService, 
    {
      provide: APP_FILTER,
      useClass: GeneralExeptionFilter
    }
  ]
})
export class UsersModule {}
