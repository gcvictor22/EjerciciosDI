import { IsString, IsInt, IsBoolean, IsAlpha, Max, Min, IsEmail, IsEnum } from 'class-validator'; 

enum UserType {
    'admin',
    'client'
}

export class CreateUserDto {
    @IsAlpha('en-US', {
        message: 'Debes introducir un nombre válido'
    })
    name : string;

    @IsAlpha()
    surname : string;

    @IsInt()
    @Min(18)
    @Max(90)
    age : number;

    @IsEmail()
    email : string;

    @IsString()
    address : string;

    @IsBoolean()
    single: boolean;

    @IsEnum(UserType)
    userType: string;
}