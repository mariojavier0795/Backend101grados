import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie';
import { ActorService } from 'src/actor/actor.service';

@Controller('/movie')
export class MovieController {
  messageResponse: string;

  constructor(
    private readonly movieService: MovieService,
    private readonly actorService: ActorService,
  ) {}

  @Post('findMovie')
  async findMovie(@Body() bodyMovie: Movie, @Res() response) {
    const listMovieResponse = await this.movieService.getMovie(bodyMovie);
    response.status(HttpStatus.OK).send({ arrayMovie: listMovieResponse });
  }

  @Post('insertMovie')
  async insertMovie(@Body() bodyMovie: any, @Res() response) {
    if (bodyMovie != null) {
      const movieTempRequest: Movie = {
        cpelicula: bodyMovie.cpelicula,
        nombrepelicula: bodyMovie.nombrepelicula,
        duracionminutos: bodyMovie.duracionminutos,
        genero: bodyMovie.genero,
        sinopsis: bodyMovie.sinopsis,
      };
      const movieSavedResponse = await this.movieService.saveMovie(
        movieTempRequest,
      );
      if (bodyMovie.actores.length != 0) {
        bodyMovie.actores.forEach(actor => {
          const listActorResult = this.actorService.getActor({
            cactor: null,
            edadactor: null,
            nombreactor: actor,
            fotoactor: null,
            movie: null,
          });
          listActorResult.then(listActorEntity => {
            if (listActorEntity.length != 0) {
              listActorEntity.forEach(actorEntity => {
                this.actorService.updateActor({
                  cactor: actorEntity.cactor,
                  edadactor: actorEntity.edadactor,
                  nombreactor: actorEntity.nombreactor,
                  fotoactor: Buffer.from(actorEntity.fotoactor).toString(
                    'base64',
                  ),
                  movie: {
                    cpelicula: movieSavedResponse.cpelicula,
                    nombrepelicula: movieSavedResponse.nombrepelicula,
                    duracionminutos: movieSavedResponse.duracionminutos,
                    genero: bodyMovie.genero,
                    sinopsis: movieSavedResponse.sinopsis,
                  },
                });
              });
            }
          });
        });
      }
      this.messageResponse =
        movieSavedResponse != null
          ? 'Película Guardada Satisfactoriamente'
          : 'No se ha podido guardar la película exitosamente';
      response
        .status(HttpStatus.OK)
        .send({ messageResponse: this.messageResponse });
    }
  }

  @Delete('deleteMovie')
  async deleteMovie(@Body() bodyMovie: Movie, @Res() response) {
    let movieDeletedResponse: any;
    let actorDeletedResponse = false;
    const resultListActorDeleted = await this.actorService.deleteActorwithMovieID(
      bodyMovie,
    );
    actorDeletedResponse = resultListActorDeleted.length != 0 ? true : false;
    movieDeletedResponse = await this.movieService.deleteMovie(bodyMovie);
    this.messageResponse = actorDeletedResponse
      ? 'Película y Actores Eliminados Satisfactoriamente'
      : movieDeletedResponse != null
      ? 'Película Eliminada Satisfactoriamente'
      : 'No se ha podido eliminar la película exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }

  @Put('updateMovie')
  async updateMovie(@Body() bodyMovie: any, @Res() response) {
    const movieUpdatedResponse = await this.movieService.updateMovie({
      cpelicula: bodyMovie.cpelicula,
      nombrepelicula: bodyMovie.nombrepelicula,
      duracionminutos: bodyMovie.duracionminutos,
      genero: bodyMovie.genero,
      sinopsis: bodyMovie.sinopsis,
    });
    if (bodyMovie.actores.length != 0) {
      bodyMovie.actores.forEach(actor => {
        const listActorResult = this.actorService.getActorByName({
          cactor: null,
          edadactor: null,
          nombreactor: actor.nombreactor,
          fotoactor: null,
          movie: null,
        });
        listActorResult.then(listActorEntity => {
          if (listActorEntity.length != 0) {
            listActorEntity.forEach(actorEntity => {
              this.actorService.updateActor({
                cactor: actorEntity.cactor,
                edadactor: actorEntity.edadactor,
                nombreactor: actorEntity.nombreactor,
                fotoactor: Buffer.from(actorEntity.fotoactor).toString(
                  'base64',
                ),
                movie: {
                  cpelicula: bodyMovie.cpelicula,
                  nombrepelicula: bodyMovie.nombrepelicula,
                  duracionminutos: bodyMovie.duracionminutos,
                  genero: bodyMovie.genero,
                  sinopsis: bodyMovie.sinopsis,
                },
              });
            });
          }
        });
      });
    }
    this.messageResponse =
      movieUpdatedResponse != null
        ? 'Película Actualizada Satisfactoriamente'
        : 'No se ha podido actualizar la película exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }
}
