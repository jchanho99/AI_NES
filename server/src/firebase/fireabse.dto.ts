import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FirebaseDto {
    @ApiProperty({
        description: '대상 날짜',
        example: '2024-07-07'
    })
    @IsOptional()
    @IsString()
    readonly date: string;

    @ApiProperty({
      description: '특정 인데스',
      example: 20
  })
    @IsOptional()
    @IsNumber()
    readonly index: number;
}