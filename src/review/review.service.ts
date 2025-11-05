/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateReviewInput } from './dto/create-review.input';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewInput } from './dto/update-review.input';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<ReviewDto[]> {
    const reviews = await this.prisma.review.findMany({
      include: { food: true },
    });
    return reviews;
  }

  async findOne(id: number): Promise<ReviewDto | null> {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: { food: true },
    });
    return review;
  }

  async create(data: CreateReviewInput): Promise<ReviewDto> {
    const review = await this.prisma.review.create({
      data,
      include: { food: true },
    });
    return review;
  }

  async update(id: number, data: UpdateReviewInput): Promise<ReviewDto> {
    const review = await this.prisma.review.update({
      where: { id },
      data,
      include: { food: true },
    });
    return review;
  }

  async remove(id: number): Promise<ReviewDto> {
    const review = await this.prisma.review.delete({
      where: { id },
      include: { food: true },
    });
    return review;
  }
}
