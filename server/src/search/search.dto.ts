import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";
export class SearchDto {
    @ApiProperty({
        description: '검색할 쿼리 문자열',
        example: '손흥민 vs 페이커'
    })
    @IsNotEmpty()
    @IsString()
    readonly query: string;
}