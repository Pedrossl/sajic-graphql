import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateReviewInput } from './dto/create-review.input';
import { ReviewDto } from './dto/review.dto';
import { UpdateReviewInput } from './dto/update-review.input';
import { ReviewService } from './review.service';

@Resolver(() => ReviewDto)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Mutation(() => ReviewDto)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewService.create(createReviewInput);
  }

  @Query(() => [ReviewDto], { name: 'review' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => ReviewDto, { name: 'review' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => ReviewDto)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => ReviewDto)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.remove(id);
  }
}
