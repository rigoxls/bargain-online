import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RequestService } from './services/request.service';
import { RequestClient } from './repository/entities/request.entity';
import { CreateRequestDto } from './dto/create-request.dto';

@Controller('request')
export class RequestController {
  constructor(private requestService: RequestService) {
  }

  @Get()
  getAllRequest(): Promise<RequestClient[]> {
    return this.requestService.getAllRequests();
  }

  @Get('/requests/:userId')
  getAllRequestByUser(@Param('userId', ParseIntPipe) userId: number): Promise<RequestClient[]> {
    return this.requestService.getAllRequestByUser(userId);
  }

  @Get('/:id')
  getRequestById(@Param('id', ParseIntPipe) id: number): Promise<RequestClient> {
    return this.requestService.getRequestById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createRequest(@Body() createRequestDto: CreateRequestDto): Promise<RequestClient> {
    return this.requestService.createRequest(createRequestDto);
  }
}
