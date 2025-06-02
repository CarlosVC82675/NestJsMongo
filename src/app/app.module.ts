import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs'),
    UsersModule, //registrando modulo de usuario
    PostsModule, //modulo de post

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
