import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryDTO } from '../../category/dto/category.dto';

@ObjectType()
export class FoodDTO {
  @Field(() => Number)
  id: number;

  @Field(() => String, { nullable: true })
  name?: string | null;

  @Field(() => Number, { nullable: true })
  price?: number | null;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => CategoryDTO, { nullable: true })
  category?: CategoryDTO | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
