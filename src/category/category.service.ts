import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CategoryDTO } from './dto/category.dto';
import { CreateCategoryInput } from './dto/create-category.input';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CategoryDTO[] | []> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async findById(id: number): Promise<CategoryDTO | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category;
  }

  async create(data: CreateCategoryInput): Promise<CategoryDTO> {
    const newCategory = await this.prisma.category.create({
      data,
    });
    return newCategory;
  }
}
