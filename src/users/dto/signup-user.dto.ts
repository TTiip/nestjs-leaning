import { IsString, Length, IsNotEmpty } from 'class-validator'

export class SignupUserDto {
  @Length(6, 30, { message: '用户名长度必须在6~30个之间' })
  @IsString({ message: '用户名必须为字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName: string

  @IsString()
  @Length(6, 30, { message: '密码长度必须在6~30个之间' })
  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  passWord: string

  @Length(6, 30, { message: '确认密码长度必须在6~30个之间' })
  @IsString({ message: '确认密码必须为字符串' })
  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string
}
