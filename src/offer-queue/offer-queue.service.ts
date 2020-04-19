import { Injectable } from '@nestjs/common';
import { RabbitMQService } from 'src/rabbit-mq/rabbit-mq.service';

@Injectable()
export class OfferQueueService {

    constructor(private rabbitMQService: RabbitMQService) {}

    sendOffer(offer: any): any { // TODO: Definir modelos y tipos de datos
        try {
            // TODO: Persistir en base de datos
            // Send message to RabbitMQ
            this.rabbitMQService.emit(offer);
        } catch (error) {
            // TODO: Controlar errores
        }
    }
}
