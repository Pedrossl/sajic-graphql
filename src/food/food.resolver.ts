import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateFoodInput } from './dto/create-food.input';
import { FoodDTO } from './dto/food.dto';
import { UpdateFoodInput } from './dto/update-food.input';
import { FoodService } from './food.service';

@Resolver(() => FoodDTO)
export class FoodResolver {
  constructor(private readonly foodService: FoodService) {}

  @Query(() => [FoodDTO])
  async findFoods(): Promise<FoodDTO[]> {
    return this.foodService.findAll();
  }

  @Query(() => FoodDTO, { nullable: true })
  async findFood(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FoodDTO | null> {
    return this.foodService.findOne(id);
  }

  @Mutation(() => FoodDTO)
  async createFood(@Args('data') data: CreateFoodInput): Promise<FoodDTO> {
    return this.foodService.create(data);
  }

  @Mutation(() => FoodDTO)
  async updateFood(@Args('data') data: UpdateFoodInput): Promise<FoodDTO> {
    return this.foodService.update(data);
  }

  @Mutation(() => FoodDTO)
  async removeFood(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<FoodDTO> {
    return this.foodService.remove(id);
  }
}
