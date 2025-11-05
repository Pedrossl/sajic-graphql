import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateFoodInput } from './create-food.input';

@InputType()
export class UpdateFoodInput extends PartialType(CreateFoodInput) {
  @Field(() => Number)
  id: number;
}
