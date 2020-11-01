import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/entities/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { ActorService } from 'src/actor/actor.service';
import { ActorEntity } from 'src/entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, ActorEntity])],
  controllers: [MovieController],
  providers: [MovieService, ActorService],
  exports: [MovieService, ActorService],
})
export class MovieModule {}
