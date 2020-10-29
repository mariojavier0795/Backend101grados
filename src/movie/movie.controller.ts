import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie';

@Controller('/movie')
export class MovieController {
  messageResponse: string;

  constructor(private readonly movieService: MovieService) {}

  @Post('findMovie')
  async findMovie(@Body() bodyMovie: Movie, @Res() response) {
    const listMovieResponse = await this.movieService.getMovie(bodyMovie);
    response.status(HttpStatus.OK).send({ arrayMovie: listMovieResponse });
  }

  @Post('insertMovie')
  async insertMovie(@Body() bodyMovie: Movie, @Res() response) {
    if (bodyMovie != null) {
      const movieSavedResponse = await this.movieService.saveMovie(bodyMovie);
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
    const movieDeletedResponse = await this.movieService.deleteMovie(bodyMovie);
    this.messageResponse =
      movieDeletedResponse != null
        ? 'Película Eliminada Satisfactoriamente'
        : 'No se ha podido eliminar la película exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }

  @Put('updateMovie')
  async updateMovie(@Body() bodyMovie: Movie, @Res() response) {
    const movieUpdatedResponse = await this.movieService.updateMovie(bodyMovie);
    this.messageResponse =
      movieUpdatedResponse != null
        ? 'Película Actualizada Satisfactoriamente'
        : 'No se ha podido actualizar la película exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }
}
