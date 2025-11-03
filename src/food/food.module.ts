import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { FoodResolver } from './food.resolver';
import { FoodService } from './food.service';

@Module({
  providers: [FoodResolver, FoodService, PrismaService],
})
export class FoodModule {}
