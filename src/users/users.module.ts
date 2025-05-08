import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './users.services';
import { UserController } from './users.controller';
 
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: user.name,
                schema: UserSchema,

            },
        ]),
    ],
    providers: [UsersService], //registrar serviços(classes injetveis) que o modulo tem que conhecer
                            //basicamente instanciando minha classe de serviço no meu modulo para posteriomente usa dentro do controlador?
    controllers: [UserController],//registrar os controles que o modulo vai usar
})
export class UsersModule{}