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
import { ActorService } from './actor.service';
import { Actor } from './actor';

@Controller('/actor')
export class ActorController {
  messageResponse: string;

  constructor(private readonly actorService: ActorService) {}

  @Post('findActor')
  async findActor(@Body() bodyActor: Actor, @Res() response) {
    let listActorResponseBase64: any[] = [];
    const listActorResponse = await this.actorService.getActor(bodyActor);
    listActorResponse.forEach(actor => {
      const actorBase64 = {
        cactor: actor.cactor,
        nombreactor: actor.nombreactor,
        edadactor: actor.edadactor,
        fotoactor: Buffer.from(actor.fotoactor).toString('base64'),
        movie: actor.movie,
      };
      listActorResponseBase64.push(actorBase64);
    });
    response
      .status(HttpStatus.OK)
      .send({ arrayMovie: listActorResponseBase64 });
  }

  @Post('insertActor')
  async insertActor(@Body() bodyActor: Actor, @Res() response) {
    if (bodyActor != null) {
      const actorSavedResponse = await this.actorService.saveActor(bodyActor);
      this.messageResponse =
        actorSavedResponse != null
          ? 'Actor Guardada Satisfactoriamente'
          : 'No se ha podido guardar el actor exitosamente';
      response
        .status(HttpStatus.OK)
        .send({ messageResponse: this.messageResponse });
    }
  }

  @Delete('deleteActor')
  async deleteActor(@Body() bodyActor: Actor, @Res() response) {
    const actorDeletedResponse = await this.actorService.deleteActor(bodyActor);
    this.messageResponse =
      actorDeletedResponse != null
        ? 'Actor Eliminado Satisfactoriamente'
        : 'No se ha podido eliminar el actor exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }

  @Put('updateActor')
  async updateMovie(@Body() bodyActor: Actor, @Res() response) {
    const movieUpdatedResponse = await this.actorService.updateActor(bodyActor);
    this.messageResponse =
      movieUpdatedResponse != null
        ? 'Actor Actualizado Satisfactoriamente'
        : 'No se ha podido actualizar el actor exitosamente';
    response
      .status(HttpStatus.OK)
      .send({ messageResponse: this.messageResponse });
  }
}
