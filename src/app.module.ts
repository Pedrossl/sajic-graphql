import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { CategoryModule } from './category/category.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    CategoryModule,
    FoodModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
