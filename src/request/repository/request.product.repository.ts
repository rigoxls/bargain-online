import { EntityRepository, Repository } from 'typeorm';
import { RequestProduct } from './entities/request.product.entity';

@EntityRepository(RequestProduct)
export class RequestProductRepository extends Repository<RequestProduct> {

  async getRequestProductsByReqId(requestId): Promise<RequestProduct[]> {
    const request = await this.find({ Id_Request: requestId });
    return request;
  }

  async createRequestProduct(requestProductData, idRequest: number): Promise<RequestProduct> {
    const requestProduct = new RequestProduct();

    requestProduct.Id_Request = idRequest;
    requestProduct.Id_Product = requestProductData.productId;
    requestProduct.Quantity = requestProductData.quantity;

    await requestProduct.save();
    return requestProduct;
  }
}
