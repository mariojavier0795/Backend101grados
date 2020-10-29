import { Movie } from 'src/movie/movie';

export interface Actor {
  cactor: number;
  nombreactor: string;
  edadactor: number;
  fotoactor: string;
  movie: Movie;
}
