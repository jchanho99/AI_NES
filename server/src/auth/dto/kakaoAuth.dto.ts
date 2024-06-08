import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class KakaoAuthDto {
    @ApiProperty({
      description: '카카오 토큰 요청에 필요한 인증 코드',
      example: "string"
    })
    @IsNotEmpty()
    @IsString()
    readonly auth_code: string;

    @ApiProperty({
      description: '카카오 사용자 정보 가져오기/로그아웃에 필요한 엑세스 토큰',
      example: "string"
    })
    @IsNotEmpty()
    @IsString()
    readonly access_token: string;
}
