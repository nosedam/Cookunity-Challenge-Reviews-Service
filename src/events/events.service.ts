import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from 'aws-sdk';
import { LoggingService } from 'src/logging/logging.service';
import { EventTypes } from './events.enum';

  

@Injectable()
export class EventsService {
    private sns: aws.SNS

    constructor(
        private configService: ConfigService,
        private loggingService: LoggingService
    ) {
        this.sns = new aws.SNS({
            region: configService.get<string>("AWS_REGION"),
            credentials: {
                accessKeyId: configService.get<string>("AWS_ACCESS_KEY_ID"),
                secretAccessKey: configService.get<string>("AWS_SECRET_ACCESS_KEY")
            }
          });
    }

    publishEvent(event: EventTypes, data: Record<string, any>): void {
        
        let toSend = {}
        toSend["event"] = event.toString()
        toSend["data"] = {...data}

        this.loggingService.log(toSend)

        this. sns.publish(
          {
            Message: JSON.stringify(toSend),
            TopicArn: `arn:aws:sns:${this.configService.get<string>("AWS_REGION")}:${this.configService.get<string>("AWS_ACCOUNT_ID")}:${this.configService.get<string>("AWS_REVIEWS_TOPIC_NAME")}`
          }
        ).promise().then(resp => {
          this.loggingService.info(`Event ${event}, successfully sent`)
        }).catch(err => {
            this.loggingService.log({"Error from SNS": err}, "error")
        });
      }

}
