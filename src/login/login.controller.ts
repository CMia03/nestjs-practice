import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('login')
export class LoginController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  @Post()
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(createUserDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { 
      sub: user.id, 
      email: user.email 
    };
    
    const token = await this.jwtService.signAsync(payload);
    const { password, ...result } = user;
    
    return {
      ...result,
      access_token: token
    };
  }
}
