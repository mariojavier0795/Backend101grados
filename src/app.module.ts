import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { MovieEntity } from './entities/movie.entity';
import { ActorEntity } from './entities/actor.entity';

@Module({
  imports: [
    MovieModule,
    ActorModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'remotemysql.com',
      port: 3306,
      username: 'gtHYJA3Oq8',
      password: 'uPNuaenTXa',
      database: 'gtHYJA3Oq8',
      entities: [MovieEntity, ActorEntity],
      synchronize: false,
      dropSchema: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
