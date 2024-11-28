import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
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

    try {
      res.status(200).json({
        status: true,
        data: {
          ...result,
          access_token: token
        }
      
      });
    } catch (error) {
      res.status(500).json({ message: 'Merci de verifier vos données' });
    }
  }
}
