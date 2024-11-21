import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This enables User repository injection
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService] // This makes UsersService available to other modules
})
export class UsersModule {}
