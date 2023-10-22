import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable( {scope: Scope.REQUEST } )
export class RequestService {

    private traceId = randomUUID()

    public getTraceId(): string {
        return this.traceId
    }

}
