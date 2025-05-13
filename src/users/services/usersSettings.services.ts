import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { userSettings } from "src/schemas/UserSettings.schema";
import { createUserSettingsDto } from "../dto/CreateUserSettings.dto";
import { user } from "src/schemas/User.schema";

@Injectable()
export class UserSettingsService {

constructor(

@InjectModel(userSettings.name) private userSettingsModel: Model<userSettings>,
@InjectModel(user.name) private userModel: Model<user>
// importando a classe do usuario e usersettings criada no scchema para usa como modelo
)
{}


async createUserSettings(UserSettingsDTO : createUserSettingsDto, UserId: string){

    //Ele criar o documento de settings.
    const newSetting = new this.userSettingsModel(UserSettingsDTO);
    await newSetting.save(); //save e await é função assicrona

    //Ele atualizar a referencia no usuario.
    const updateUser = await this.userModel.findByIdAndUpdate(UserId,{settings : newSetting._id},{new:true});
    return updateUser;

}











}