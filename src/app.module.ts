import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs'),
    UsersModule, //registrando modulo de usuario

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
