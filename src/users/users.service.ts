import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Revenu } from 'src/revenu/entities/revenu.entity';

@Injectable()
export class UsersService {
  [x: string]: any;
  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>,

    @InjectRepository(Revenu)
    private revenuRepository: Repository<Revenu>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserIdByRevenuId(userId: number, revenuId: number): Promise<any> {
    const revenu = await this.revenuRepository.findOne({
      where: { idRevenu: revenuId },
      relations: ['user'],  // Charge la relation avec l'utilisateur
    });
    if (!revenu) {
      console.error('Revenu non trouvé pour l\'id :', revenuId);
      return null; 
    }
    const revenuUserId = Number(revenu.user.id);  
    const paramUserId = Number(userId);  
    if (revenuUserId !== paramUserId) {
      return null;  
    }
    return revenu; 
  }
  
  
  
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }  
  
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

 async remove(id: number): Promise<void> {
    return await this.userRepository.delete(id).then(() => {});
  }
}
