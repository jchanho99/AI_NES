import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchDto } from './search.dto';

@ApiTags('챗봇 쿼리 요청 API')
@Controller(`search`)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  
  @UseGuards(JwtAuthGuard)
  @Post(`news`)
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiOperation({ summary: '검색어로 쿼리를 사용하여 검색' })
  @ApiBearerAuth()
  @ApiBody({
    description: '뉴스 검색 요청 데이터',
    type: SearchDto,
  })
  @ApiResponse({ status:401, description:"로그인 후 이용해주세요." })
  findAll(@Body() data: SearchDto): any {
    return this.searchService.findAll(data.query);
  }
}
