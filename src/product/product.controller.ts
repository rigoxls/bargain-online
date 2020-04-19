import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { Product } from './respository/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {
  }

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post('/createProducts')
  createProducts(@Body() createProducts) {
    return this.productService.createProducts(createProducts);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Post('/:id')
  @UsePipes(ValidationPipe)
  updateProduct(@Param('id', ParseIntPipe) id: number, @Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.updateProduct(id, createProductDto);
  }
}
