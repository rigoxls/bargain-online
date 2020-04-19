import {Injectable, Logger} from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {

  private server;
  private channel;
  private exchange: string = 'offers';
  private readonly logger = new Logger(RabbitMQService.name);
  constructor() {
    this.init();
  }

  private async init() {
    this.server = await amqp.connect('amqp://kxsfcakg:jahgl20UG_mvcXK9f7keJpazfDSJtarc@prawn.rmq.cloudamqp.com/kxsfcakg');
    this.channel = await this.server.createChannel();
    this.channel.assertExchange(this.exchange, 'fanout', {
      durable: false,
    });
  }

  /**
   * Emit Message to rabbitMQ
   * @param data
   */
  public async emit(data: any) {
    const sendData = {
      data: JSON.parse(JSON.stringify(data)),
      pattern: 'rabbit-mq-producer',
    };
    this.logger.log(`Sending data to RabbitMQ`);
    this.channel.publish(this.exchange, '', Buffer.from(JSON.stringify(sendData)));
  }
}
