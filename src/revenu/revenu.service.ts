import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revenu } from './entities/revenu.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateRevenuDto } from './dto/create-revenu.dto';

@Injectable()
export class RevenuService {
  constructor(
    @InjectRepository(Revenu)
    private readonly revenuRepository: Repository<Revenu>, 

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  
  ) {}

  async create(createRevenuDto: CreateRevenuDto): Promise<Revenu> {
    const user = await this.userRepository.findOne({
      where: { id: createRevenuDto.userID },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    const newRevenu = this.revenuRepository.create({
      ...createRevenuDto,
      user: user,  
    });
  
    return await this.revenuRepository.save(newRevenu);
  }
  
  async getRevenuByUserId(userId: number): Promise<Revenu[]> {
    const revenus = await this.revenuRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],  
    });

    if (!revenus || revenus.length === 0) {
      throw new Error(`Aucun revenu trouvé pour l'utilisateur avec l'ID ${userId}`);
    }

    return revenus;  
  }
 
  async findAll(): Promise<Revenu[]> {
    return this.revenuRepository.find({
      relations: ['userId'],  
    });
  }

  async findOne(id: number): Promise<Revenu | null> {
    return this.revenuRepository.findOne({
      where: {
        idRevenu: id,  
      },
      relations: ['user'],  
    });
  }

  async update(id: number, revenu: Partial<Revenu>): Promise<Revenu> {
    await this.revenuRepository.update(id, revenu);
    return this.findOne(id);  
  }

  async remove(id: number): Promise<void> {
    await this.revenuRepository.delete(id);  
  }
}
