import { EntityRepository, Repository } from 'typeorm';
import { RequestClient } from './entities/request.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { StatusRequest } from '../enums/status-request.enum';

@EntityRepository(RequestClient)
export class RequestRepository extends Repository<RequestClient> {

  async getAllRequests(): Promise<RequestClient[]> {
    const request = await this.find({ Status: StatusRequest.PENDING });
    return request;
  }

  async getAllRequestByUser(userId): Promise<RequestClient[]> {
    const request = await this.find({ User_Id: userId });
    return request;
  }

  async getRequestById(id): Promise<RequestClient> {
    const request = await this.findOne(id);
    return request;
  }

  async createRequest(createRequestDto: CreateRequestDto): Promise<RequestClient> {
    const request = new RequestClient();

    request.User_Id = createRequestDto.userId;
    request.Status = createRequestDto.status;

    await request.save();
    return request;
  }
}
