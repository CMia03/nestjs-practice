import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { RevenuService } from './revenu.service';
import { CreateRevenuDto } from './dto/create-revenu.dto';
import { UpdateRevenuDto } from './dto/update-revenu.dto';
import { JwtAuthGuard } from 'src/jwt-auth.guard';

@Controller('revenu')
@UseGuards(JwtAuthGuard)
export class RevenuController {
  constructor(private readonly revenuService: RevenuService) {}

  @Post()
 async create(@Body() createRevenuDto: CreateRevenuDto, @Res() res: Response) {
    try {
      const response = await this.revenuService.create(createRevenuDto);
      console.log(response);
      res.status(200).json({
        status: true,
        data: response
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data: error,
      });
    }
  }

  @Get('user/:userId')
  async getRevenuByUserId(@Param('userId') userId: number, @Res() res: Response) {
    try {
      const response = await this.revenuService.getRevenuByUserId(userId);
      res.status(200).json({
        status: true,
        data: response
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        data: error,
      });
    }
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.revenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRevenuDto: UpdateRevenuDto) {
    return this.revenuService.update(+id, updateRevenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.revenuService.remove(+id);
  }
}
