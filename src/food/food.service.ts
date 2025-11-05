// ...existing code...
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateFoodInput } from './dto/create-food.input';
import { FoodDTO } from './dto/food.dto';
import { UpdateFoodInput } from './dto/update-food.input'; // { changed code }

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
    const { categoryId } = data;

    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException(
        `Categoria com ID ${categoryId} não encontrada.`,
      );
    }

    const food = await this.prisma.food.create({
      data,
      include: { category: true },
    });
    return food;
  }

  async update(data: UpdateFoodInput): Promise<FoodDTO> {
    const foodExists = await this.prisma.food.findUnique({
      where: { id: data.id },
    });
    if (!foodExists) {
      throw new NotFoundException(`Prato com ID ${data.id} não encontrado.`);
    }

    if (data.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!categoryExists) {
        throw new NotFoundException(
          `Categoria com ID ${data.categoryId} não encontrada.`,
        );
      }
    }

    const updated = await this.prisma.food.update({
      where: { id: data.id },
      data,
      include: { category: true },
    });

    return updated;
  }

  async remove(id: number): Promise<FoodDTO> {
    const foodExists = await this.prisma.food.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!foodExists) {
      throw new NotFoundException(`Prato com ID ${id} não encontrado.`);
    }

    const deleted = await this.prisma.food.delete({
      where: { id },
      include: { category: true },
    });

    return deleted;
  }
}
