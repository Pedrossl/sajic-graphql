import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateReviewInput {
  @Field(() => Int)
  rating: number;

  @Field(() => String, { nullable: true })
  comment?: string;

  @Field(() => Int)
  foodId: number;
}
