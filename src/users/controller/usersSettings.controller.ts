import { Body, Controller, HttpException, Param, Post } from "@nestjs/common";
import { UserSettingsService } from "../services/usersSettings.services";
import { createUserSettingsDto } from "../dto/CreateUserSettings.dto";
import mongoose from "mongoose";

@Controller('userSettings')
export class UserSettingsController{

    //Injetando a classe de serviço
    constructor(private UserSettingsservice: UserSettingsService){}


    @Post(':id')
    async createUserSettings(@Body() createSettings:createUserSettingsDto, @Param('id') userid:string){

        const isValid = mongoose.Types.ObjectId.isValid(userid);
        if(!isValid) throw new HttpException('Usuario invalido', 404);
        const updatedUser = await this.UserSettingsservice.createUserSettings(createSettings,userid);
        if(!updatedUser) throw new HttpException('configurações nao atualizado',404);
        return {
            message: 'configuração atualizada com sucesso',
            user: updatedUser
        } 

    }










}