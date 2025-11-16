import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';
import { User } from './users/entities/user.entity';
import { Todo } from './todos/entities/todo.entity';
import { AppController } from './app.controller';

@Module({
  // imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true,
  //   }),
  //   TypeOrmModule.forRootAsync({
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService) => ({
  //       type: 'postgres',
  //       host: configService.get<string>('DB_HOST', 'localhost'),
  //       port: configService.get<number>('DB_PORT', 5454),
  //       username: configService.get<string>('DB_USERNAME'),
  //       password: configService.get<string>('DB_PASSWORD'),
  //       database: configService.get<string>('DB_DATABASE', 'postgres_db'),
  //       entities: [User, Todo],
  //       synchronize: true,
  //     }),
  //     inject: [ConfigService],
  //   }),
  //   AuthModule,
  //   UsersModule,
  //   TodosModule,
  // ],
  controllers: [AppController],
})
export class AppModule {}
