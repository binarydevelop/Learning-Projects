import { MiddlewareConsumer, Module, NestModule, Request, RequestMethod } from '@nestjs/common';
import { loggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(loggerMiddleware)
      .forRoutes({path: 'users' , method: RequestMethod.ALL})
  }
}
