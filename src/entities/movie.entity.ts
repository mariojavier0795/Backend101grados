import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ActorEntity } from './actor.entity';

@Entity('pelicula')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  cpelicula: number;

  @Column({
    type: 'varchar',
    length: 150,
    name: 'NOMBREPELICULA',
  })
  nombrepelicula: string;

  @Column({
    type: 'int',
    name: 'DURACIONMINUTOS',
  })
  duracionminutos: number;

  @Column({
    type: 'varchar',
    length: 150,
    name: 'GENERO',
    default: ['Animadas', 'Romántica', 'Comedia', 'Terror'],
  })
  genero: string;

  @Column({
    type: 'varchar',
    length: 256,
    name: 'SINOPSIS',
  })
  sinopsis: string;

  @OneToMany(
    type => ActorEntity,
    actor => actor.movie,
  )
  actors: ActorEntity[];
}
