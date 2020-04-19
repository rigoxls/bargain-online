import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from '../respository/product.repository';
import { Product } from '../respository/entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {
  }

  async getProducts(): Promise<Product[]> {
    return await this.productRepository.getProducts();
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.getProductById(id);

    if (!found) {
      throw new NotFoundException(`Product with ID ${id}, not found`);
    }

    return found;
  }

  async createProducts(createProducts) {
    const products = createProducts.products;
    try {
      products.forEach(product => {
        this.productRepository.createProduct(product);
      });
    } catch (error) {
      return { error };
    }

    return { ok: 'products created' };
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.createProduct(createProductDto);
  }

  async updateProduct(id, createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.updateProduct(id, createProductDto);
  }
}
