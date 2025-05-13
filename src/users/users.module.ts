import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { user, UserSchema } from 'src/schemas/User.schema';
import { UsersService } from './services/users.services';
import { UserController } from './controller/users.controller';
import { userSettings, userSettingsSchema } from 'src/schemas/UserSettings.schema';
import { UserSettingsService } from './services/usersSettings.services';
import { UserSettingsController } from './controller/usersSettings.controller';
 
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: user.name, 
                schema: UserSchema,

            }, 
            {
                name: userSettings.name,
                schema: userSettingsSchema,
            } ,
        ]),
    ],
    providers: [UsersService,UserSettingsService], //registrar serviços(classes injetveis) que o modulo tem que conhecer
                            //basicamente instanciando minha classe de serviço no meu modulo para posteriomente usa dentro do controlador?
    controllers: [UserController,UserSettingsController],//registrar os controles que o modulo vai usar
})
export class UsersModule{}