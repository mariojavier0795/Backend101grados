import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { MovieEntity } from 'src/entities/movie.entity';
import { Movie } from './movie';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  getMovie(movie: Movie): Promise<MovieEntity[]> {
    let listMovie: any;
    if (
      movie.cpelicula == null &&
      movie.duracionminutos == null &&
      movie.genero == null &&
      movie.nombrepelicula == null &&
      movie.sinopsis == null
    ) {
      listMovie = this.movieRepository.find();
    } else {
      listMovie = this.movieRepository.find({
        relations: ['actors'],
        where: [
          {
            cpelicula: movie.cpelicula,
          },
          {
            nombrepelicula:
              movie.nombrepelicula == null
                ? null
                : Like('%' + movie.nombrepelicula + '%'),
          },
          {
            duracionminutos:
              movie.duracionminutos == null ? 0 : movie.duracionminutos,
          },
          {
            genero: movie.genero,
          },
          {
            sinopsis:
              movie.sinopsis == null ? null : Like('%' + movie.sinopsis + '%'),
          },
        ],
      });
    }
    return listMovie;
  }

  saveMovie(movie: Movie): Promise<MovieEntity> {
    const movieEntitySaved = this.movieRepository.create(movie);
    return this.movieRepository.save(movieEntitySaved);
  }

  deleteMovie(movie: Movie): Promise<MovieEntity> {
    let movieEntityDeleted: any;
    if (movie.cpelicula != null) {
      movieEntityDeleted = this.movieRepository.delete({
        cpelicula: movie.cpelicula,
      });
    }
    return movieEntityDeleted;
  }

  updateMovie(movie: Movie): Promise<MovieEntity> {
    let movieEntityUpdated: any;
    if (movie.cpelicula != null) {
      movieEntityUpdated = this.movieRepository.update(
        {
          cpelicula: movie.cpelicula,
        },
        movie,
      );
    }
    return movieEntityUpdated;
  }
}
