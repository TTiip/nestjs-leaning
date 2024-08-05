import { HttpException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { md5 } from '../utils'
import { SignupUserDto } from './dto'
import { User } from './schemas'
import { SigninUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signin(signinUserDto: SigninUserDto) {
    const user = await this.userModel.findOne({
      userName: signinUserDto.userName,
    })

    if (!user)
      throw new HttpException('Invalid userName or passWord', 200)

    if (user.passWord !== md5(signinUserDto.passWord))
      throw new HttpException('Invalid userName or passWord', 200)

    return user
  }

  async signup(signupUserDto: SignupUserDto) {
    const user = await this.userModel
      .findOne({
        userName: signupUserDto.userName,
      })
      .exec()

    if (user)
      throw new HttpException('用户已存在', 200)

    try {
      // eslint-disable-next-line new-cap
      const createUser = new this.userModel({
        userName: signupUserDto.userName,
        passWord: md5(signupUserDto.passWord),
      })

      return createUser.save()
    }
    catch (e) {
      throw new HttpException('注册失败', 200)
    }
  }
}
