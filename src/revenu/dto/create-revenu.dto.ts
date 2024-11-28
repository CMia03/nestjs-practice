import { IsString, IsDecimal, IsDateString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateRevenuDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDecimal()
  @IsNotEmpty()
  montant: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @IsNotEmpty()
  userID: number;
}
