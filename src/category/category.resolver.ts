import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto/category.dto';
import { CreateCategoryInput } from './dto/create-category.input';

@Resolver('Category')
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryDTO])
  async findCategory(): Promise<CategoryDTO[]> {
    const catogories = await this.categoryService.findAll();
    return catogories;
  }

  @Query(() => CategoryDTO, { nullable: true })
  async findOneCategory(id: number): Promise<CategoryDTO | null> {
    const category = await this.categoryService.findById(id);
    return category;
  }

  @Mutation(() => CategoryDTO)
  async createCategory(
    @Args('data') data: CreateCategoryInput,
  ): Promise<CategoryDTO> {
    const catega = await this.categoryService.create(data);
    return catega;
  }
}
