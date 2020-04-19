import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRepository } from '../repository/request.repository';
import { RequestClient } from '../repository/entities/request.entity';
import { CreateRequestDto } from '../dto/create-request.dto';
import { RequestProductRepository } from '../repository/request.product.repository';
import { ProductRepository } from '../../product/respository/product.repository';

@Injectable()
export class RequestService {

  constructor(
    @InjectRepository(RequestRepository)
    private requestRepository: RequestRepository,
    @InjectRepository(RequestProductRepository)
    private requestProductRepository: RequestProductRepository,
    private productRepository: ProductRepository,
  ) {
  }

  async getAllRequests(): Promise<RequestClient[]> {
    return await this.requestRepository.getAllRequests();
  }

  async getAllRequestByUser(userId: number): Promise<RequestClient[]> {
    return await this.requestRepository.getAllRequestByUser(userId);
  }

  async getRequestById(id: number): Promise<RequestClient> {
    const found = await this.requestRepository.getRequestById(id);
    const requestProducts = await this.requestProductRepository.getRequestProductsByReqId(found.Id);
    const products = await this.productRepository.getProducts();

    const productsInfo = requestProducts.map(rProd => {
      const pInfo = products.filter(prod => prod.Id === rProd.Id_Product);
      return {
        Id: rProd.Id,
        Id_Request: rProd.Id,
        Id_Product: rProd.Id_Product,
        Name: pInfo[0].Name,
        Description: pInfo[0].Description,
        Price: pInfo[0].Price,
        Id_Catalogue: pInfo[0].Id_Catalogue,
        imageURLs: [pInfo[0].Image],
      };
    });

    if (!found) {
      throw new NotFoundException(`Request with ID ${id}, not found`);
    }

    return Object.assign(found, { products: productsInfo });
  }

  async createRequest(createRequestDto: CreateRequestDto): Promise<RequestClient> {
    const request = await this.requestRepository.createRequest(createRequestDto);

    if (createRequestDto) {
      createRequestDto.products.forEach(requestProduct => {
        this.requestProductRepository.createRequestProduct(requestProduct, request.Id);
      });
    }

    return request;
  }
}
