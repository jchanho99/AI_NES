import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class AuthDto {
    @ApiProperty({
      description: '일반 로그인/회원가입 시 입력 아이디',
      example: "string"
    })
    @IsNotEmpty()
    @IsString()
    readonly id: string;

    @ApiProperty({
      description: '일반 로그인/회원가입 시 입력 비밀번호',
      example: "string"
    })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiProperty({
      description: '일반 회원가입 시 입력 이메일',
      example: "string"
    })
    @IsOptional()
    @IsString()
    readonly email: string;

    @ApiProperty({
      description: '구글 로그인 시 JWT토큰 발급에 필요한 인증 토큰',
      example: "string"
    })
    @IsOptional()
    @IsString()
    readonly token: string;
}
