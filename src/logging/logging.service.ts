import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/request/request.service';

@Injectable()
export class LoggingService {

    private logger: Logger = new Logger("HTTP")

    constructor(private requestService: RequestService) {}

    public log(obj: Record<string, any>, level: string = "info") {
        let objToLog = {...obj}
        objToLog["traceId"] = this.requestService.getTraceId()
        objToLog["level"] = level

        this.logger.log(JSON.stringify(objToLog))
    }

    public info(message: string) {
        this.log({"message": message, "level": "info"})
    }

}
