import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ValidatorMiddleware } from './middlewares/validator/validator.middleware';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidatorMiddleware)
      .exclude(
        {path: 'users', method: RequestMethod.GET},
        {path: 'users', method: RequestMethod.DELETE}
      )
      .forRoutes(
        {path: 'users', method : RequestMethod.POST},
        {path: 'users/(*)', method: RequestMethod.PATCH}
      )
  }

}
