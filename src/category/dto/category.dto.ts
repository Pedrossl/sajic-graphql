import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryDTO {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
