import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class OfferQueueService {

  constructor(private rabbitMQService: RabbitMQService) {
  }

  sendRequestEmit(requestPayload: any, requestId: number): any {
    try {
      // Send message to RabbitMQ
        requestPayload = Object.assign(requestPayload, {requestId});
      this.rabbitMQService.emit(requestPayload);
    } catch (error) {
      console.error(error);
    }
  }
}
