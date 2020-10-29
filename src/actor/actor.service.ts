import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ActorEntity } from 'src/entities/actor.entity';
import { Actor } from './actor';

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
            movie: actor.movie,
          },
        ],
      });
    }
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
