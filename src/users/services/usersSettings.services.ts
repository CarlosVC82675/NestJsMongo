import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { createUserSettingsDto } from "../dto/CreateUserSettings.dto";
import { User } from "src/schemas/User.schema";

@Injectable()
export class UserSettingsService {

constructor(

@InjectModel(UserSettings.name) private userSettingsModel: Model<UserSettings>,
@InjectModel(User.name) private userModel: Model<User>
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