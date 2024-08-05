import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from './users.service'
import { SignupUserDto, SigninUserDto } from './dto'

@Controller('users')
export class UsersController {
  @Inject(JwtService)
  private jwtService: JwtService

  constructor(private readonly usersService: UsersService) {}

  @Post('signin')
  async signin(@Body() signinUserDto: SigninUserDto) {
    const user = await this.usersService.signin(signinUserDto)

    if (user) {
      const token = await this.signToken(user)
      return this.mapResponse(user, token)
    }
    else {
      throw new HttpException('登录失败', 200)
    }
  }

  @Post('signup')
  async signup(@Body() signupUserDto: SignupUserDto) {
    if (signupUserDto.passWord !== signupUserDto.confirmPassword)
      throw new HttpException('两次输入的密码不一致', 200)

    const user = await this.usersService.signup(signupUserDto)

    if (user) {
      const token = await this.signToken(user)
      return this.mapResponse(user, token)
    }
    else {
      throw new HttpException('注册失败', 200)
    }
  }

  private async signToken(user) {
    const token = await this.jwtService.signAsync({
      user: {
        id: user.id,
        userName: user.userName,
      },
    })

    return token
  }

  private mapResponse(user, token) {
    return {
      user: {
        userName: user.userName,
      },
      token,
    }
  }
}
