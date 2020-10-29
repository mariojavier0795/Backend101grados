import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('actor')
export class ActorEntity {
  @PrimaryGeneratedColumn()
  cactor: number;

  @Column({
    type: 'varchar',
    length: 150,
    name: 'NOMBREACTOR',
  })
  nombreactor: string;

  @Column({
    type: 'int',
    name: 'EDADACTOR',
  })
  edadactor: number;

  @Column({
    type: 'longblob',
    name: 'FOTOACTOR',
  })
  fotoactor: Buffer;

  @ManyToOne(
    type => MovieEntity,
    movie => movie.actors,
  )
  @JoinColumn({ name: 'cpelicula', referencedColumnName: 'cpelicula' })
  movie: MovieEntity;
}
