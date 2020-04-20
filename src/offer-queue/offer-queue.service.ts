import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';
import { passEmailConfig, emailConfig } from '../config/email.config';
// tslint:disable-next-line:no-var-requires
const nodemailer = require('nodemailer');

@Injectable()
export class OfferQueueService {
  transporter = null;

  constructor(private rabbitMQService: RabbitMQService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: passEmailConfig,
    });
  }

  sendRequestEmit(requestPayload: any, requestId: number): any {
    try {
      // Send message to RabbitMQ
      requestPayload = Object.assign(requestPayload, { requestId });
      this.rabbitMQService.emit(requestPayload);
    } catch (error) {
      console.error(error);
    }
  }

  sendEmail(customSettings) {
    emailConfig.subject = customSettings.subject;
    emailConfig.text = customSettings.text;
    emailConfig.to = customSettings.toDes;

    this.transporter.sendMail(emailConfig, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
