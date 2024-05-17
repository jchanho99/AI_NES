import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller(`search`)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post(`news`)
  findAll(@Body() data: { query: string }): any {
    console.log(data);
    return this.searchService.findAll(data.query);
  }
}
