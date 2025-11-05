import { Field, ObjectType } from '@nestjs/graphql';
import { FoodDTO } from '../../food/dto/food.dto';

@ObjectType()
export class ReviewDto {
  @Field(() => Number)
  id: number;

  @Field(() => Number)
  rating: number;

  @Field(() => String, { nullable: true })
  comment?: string | null;

  @Field(() => FoodDTO)
  food: FoodDTO;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
