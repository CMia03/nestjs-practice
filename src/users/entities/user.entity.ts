import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Revenu } from 'src/revenu/entities/revenu.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Revenu, (revenu) => revenu.user)
  revenus: Revenu[];
}
