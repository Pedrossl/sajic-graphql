import { Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
}
