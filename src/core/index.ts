import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  ValidationPipe,
  ValidationError,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { checkValueType } from '../utils';

/** 全局错误过滤器 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    let message;
    if (checkValueType(exception.getResponse(), 'object')) {
      const m = (exception.getResponse() as { message?: string })?.message;
      message = Array.isArray(m) ? m[0] : 'Service Error';
    } else {
      message = exception.getResponse();
    }

    const errorResponse = {
      data: null,
      message,
      code: -1,
    };

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

/** 全局的拦截器 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 0,
          message: '请求成功',
        };
      }),
    );
  }
}

/** 全局自定义DTO校验管道 */
// https://www.mulingyuer.com/archives/966/
@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      // 遇到第一个验证错误时停止进一步的验证
      stopAtFirstError: true,
    });
  }

  protected mapChildrenToValidationErrors(
    error: ValidationError,
    parentPath?: string,
  ): ValidationError[] {
    const errors = super.mapChildrenToValidationErrors(error, parentPath);
    console.log(errors, 'errors');

    errors.forEach((error) => {
      Object.keys(error.constraints).forEach((key) => {
        error.constraints[key] =
          `字段【${error.property}】的值为【${error.value}】但是${error.constraints[key]}`;
      });
    });
    console.log(errors, 'errors');
    return errors;
  }
}
