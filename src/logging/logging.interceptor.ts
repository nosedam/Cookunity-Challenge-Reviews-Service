import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { classToPlain, instanceToPlain } from 'class-transformer';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(private logger: LoggingService) {

    }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()

    const req = ctx.getRequest()


    let logRequestMessage = {
        "method": req.method,
        "url": req.url,
    }
    
    if (req.user != null && req.user != undefined) {
      logRequestMessage["user_id"] = req.user.id
    }

    if (req.body != null && JSON.stringify(req.body) != "{}") {
        let body = { ...req.body }
        delete body.password
        delete body.passwordConfirmation
        logRequestMessage["body"] = instanceToPlain(body)
    }

    this.logger.log(logRequestMessage)

    return next
      .handle()
      .pipe(
        tap(() => {
            const ctx = context.switchToHttp()

            const res = ctx.getResponse()

            const { statusCode } = res

            let logResponseMessage = {
                "status": statusCode
            }
            this.logger.log(logResponseMessage)

            console.log()
        }),
      );
  }
}
