import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class LoggingService {

    private logger: Logger = new Logger("HTTP")

    constructor(private requestService: RequestService) {}

    public log(obj: Record<string, any>) {
        let objToLog = {...obj}
        objToLog["traceId"] = this.requestService.getTraceId()
        if (!objToLog.level) {
            objToLog["level"] = "info"
        }

        this.logger.log(JSON.stringify(objToLog))
    }

    public info(message: string) {
        this.log({"message": message, "level": "info"})
    }

}
