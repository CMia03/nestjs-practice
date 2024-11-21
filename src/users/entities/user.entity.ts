import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Le décorateur indique que cette classe est une entité
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
