import {
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsNumber,
  Min,
} from 'class-validator';
export class CreateCatDto {
  @Length(6, 15, { message: '用户名长度必须在6~15个之间' })
  @IsString({ message: '用户名必须为字符串' })
  @IsNotEmpty({ message: '用户名不能为空' })
  userName;

  @Length(6, 15, { message: '密码长度必须在6~15个之间' })
  @IsString({ message: '密码必须为字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  passWord;

  @Length(6, 15, { message: '名称长度必须在6~15个之间' })
  @IsString({ message: '名称必须为字符串' })
  @IsNotEmpty({ message: '名称不能为空' })
  name;

  @IsNumber(
    {},
    {
      message: '年龄必须是数字',
    },
  )
  @Min(18, { message: '年龄必须大于18岁' })
  @IsNotEmpty({ message: '年龄不能为空' })
  age;

  @IsOptional()
  @IsDate()
  time?;
}

export class UpdateCatDto extends CreateCatDto {
  id?: string | number;
}

export class ListAllEntities {
  limit: number;
}
