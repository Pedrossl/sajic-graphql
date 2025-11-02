import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateFoodInput } from './dto/create-food.input';
import { FoodDTO } from './dto/food.dto';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<FoodDTO[]> {
    const food = await this.prisma.food.findMany({
      include: { category: true },
    });
    return food;
  }

  async findOne(id: number): Promise<FoodDTO | null> {
    const food = await this.prisma.food.findUnique({
      where: { id },
      include: { category: true },
    });
    return food;
  }

  async create(data: CreateFoodInput): Promise<FoodDTO> {
    const food = await this.prisma.food.create({
      data,
      include: { category: true },
    });
    return food;
  }
}
