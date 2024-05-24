import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller(`search`)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Post(`news`)
  findAll(@Body() data: { query: string }): any {
    console.log(data);
    return this.searchService.findAll(data.query);
  }
}
