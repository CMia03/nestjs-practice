import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Revenu {
  @PrimaryGeneratedColumn()
  idRevenu: number;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  montant: number;

  @Column('date')
  date: string;

  @ManyToOne(() => User, (user) => user.revenus)
  @JoinColumn({ name: 'userId' })
  user: User;
}
