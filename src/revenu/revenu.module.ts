import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenuService } from './revenu.service';
import { RevenuController } from './revenu.controller';
import { Revenu } from './entities/revenu.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Revenu, User]),
  ],
  controllers: [RevenuController],
  providers: [RevenuService],
  exports: [RevenuService]
})
export class RevenuModule {}
