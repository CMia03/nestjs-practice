import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenuDto } from './create-revenu.dto';

export class UpdateRevenuDto extends PartialType(CreateRevenuDto) {}
