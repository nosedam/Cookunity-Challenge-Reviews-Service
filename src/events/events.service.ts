import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { LoggingService } from 'src/logging/logging.service';
import { EventTypes } from './events.enum';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';



@Injectable()
export class EventsService {
    private sns: SNSClient

    constructor(
        private configService: ConfigService,
        private loggingService: LoggingService
    ) {
        this.sns = new SNSClient({
            region: configService.get<string>("AWS_REGION"),
            credentials: {
                accessKeyId: configService.get<string>("AWS_KEY_ID"),
                secretAccessKey: configService.get<string>("AWS_SECRET")
            }
        })

    }

    async publishEvent(event: EventTypes, data: Record<string, any>) {

        let toSend = {}
        toSend["event"] = event.toString()
        toSend["data"] = { ...data }

        const topic = `arn:aws:sns:${this.configService.get<string>("AWS_REGION")}:${this.configService.get<string>("AWS_ACCOUNT_ID")}:${this.configService.get<string>("AWS_REVIEWS_TOPIC_NAME")}`
        this.loggingService.info(`Publishing ${event.toString()} to ${topic}`)
        
        
        const publishCommand = new PublishCommand({
            Message: JSON.stringify(toSend),
            TopicArn: topic
        })
        
        const res = await this.sns.send(publishCommand)

        this.loggingService.info(`Successfully published to ${topic} with messageId ${res.MessageId}`)
    }

}
