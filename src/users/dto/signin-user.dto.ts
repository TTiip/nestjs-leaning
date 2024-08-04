import { IsNotEmpty, IsString, Length } from 'class-validator'

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 25)
  userName: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 30)
  passWord: string
}
