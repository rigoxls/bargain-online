import { EntityRepository, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  async getProducts(): Promise<Product[]> {
    return await this.find();
  }

  async getProductById(id): Promise<Product> {
    const product = await this.findOne(id);
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = new Product();

    product.Name = createProductDto.name;
    product.Description = createProductDto.description;
    product.Price = createProductDto.price;
    product.User_Id = createProductDto.userId;
    product.Image = createProductDto.image;
    product.Id_Catalogue = createProductDto.idCatalogue;

    await product.save();
    return product;
  }

  async updateProduct(id, updateProduct: CreateProductDto): Promise<Product> {
    const product = await this.getProductById(id);

    product.Name = updateProduct.name;
    product.Description = updateProduct.description;
    product.Price = updateProduct.price;
    product.Image = updateProduct.image;
    product.Id_Catalogue = updateProduct.idCatalogue;

    await product.save();
    return product;
  }
}
