import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ActorEntity } from 'src/entities/actor.entity';
import { Actor } from './actor';
import { Movie } from 'src/movie/movie';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  getActor(actor: Actor): Promise<ActorEntity[]> {
    let listActor: any;
    if (
      actor.cactor == null &&
      actor.edadactor == null &&
      actor.fotoactor == null &&
      actor.nombreactor == null &&
      actor.movie == null
    ) {
      listActor = this.actorRepository.find({ relations: ['movie'] });
    } else {
      listActor = this.actorRepository.find({
        relations: ['movie'],
        where: [
          {
            cactor: actor.cactor,
          },
          {
            nombreactor: Like('%' + actor.nombreactor + '%'),
          },
          {
            edadactor: actor.edadactor,
          },
          {
            movie: actor.movie == null ? '' : actor.movie,
          },
        ],
      });
    }
    return listActor;
  }

  getActorByName(actor: Actor): Promise<ActorEntity[]> {
    const listActor = this.actorRepository.find({
      relations: ['movie'],
      where: [{ nombreactor: Like('%' + actor.nombreactor + '%') }],
    });
    return listActor;
  }

  saveActor(actor: Actor): Promise<ActorEntity> {
    const actorEntitySaved = this.actorRepository.create({
      cactor: null,
      nombreactor: actor.nombreactor,
      edadactor: actor.edadactor,
      fotoactor: new Buffer(actor.fotoactor, 'base64'),
      movie: actor.movie,
    });
    return this.actorRepository.save(actorEntitySaved);
  }

  deleteActor(actor: Actor): Promise<ActorEntity> {
    let actorEntityDeleted: any;
    if (actor.cactor != null) {
      actorEntityDeleted = this.actorRepository.delete({
        cactor: actor.cactor,
      });
    }
    return actorEntityDeleted;
  }

  deleteActorwithMovieID(movie: Movie): Promise<ActorEntity[]> {
    let actorEntityDeleted: any;
    if (movie.cpelicula != null) {
      actorEntityDeleted = this.actorRepository.delete({
        movie: movie,
      });
    }
    return actorEntityDeleted;
  }

  updateActor(actor: Actor): Promise<ActorEntity> {
    let actorEntityUpdated: any;
    if (actor.cactor != null) {
      actorEntityUpdated = this.actorRepository.update(
        {
          cactor: actor.cactor,
        },
        {
          cactor: actor.cactor,
          nombreactor: actor.nombreactor,
          edadactor: actor.edadactor,
          fotoactor: new Buffer(actor.fotoactor, 'base64'),
          movie: actor.movie,
        },
      );
    }
    return actorEntityUpdated;
  }
}
