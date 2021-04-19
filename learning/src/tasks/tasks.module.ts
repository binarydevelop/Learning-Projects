import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { loggerMiddleware } from '../common/middleware/logger.middleware';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer
      .apply(loggerMiddleware)
      .forRoutes({path: 'tasks' , method: RequestMethod.ALL})
  }
}
