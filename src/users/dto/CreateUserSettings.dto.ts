import { IsBoolean, IsOptional } from "class-validator";

export class createUserSettingsDto{
    
@IsOptional()
@IsBoolean()    
recebernotificacao? : boolean;

@IsOptional()
@IsBoolean()
receberemails?: boolean;

@IsOptional()
@IsBoolean()
receberSMS?: boolean;


}