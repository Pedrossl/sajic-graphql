import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateFoodInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  price: number;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Number)
  categoryId: number;
}
