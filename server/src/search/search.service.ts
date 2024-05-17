import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(query: string): Promise<Observable<AxiosResponse<any, any>>> {
    const query1 = encodeURI(query);
    const api_url = `https://openapi.naver.com/v1/search/news.json?query=` + query1;
    const options = {
      url: api_url,
      headers: {
        'X-Naver-Client-Id': 'r7vZcdRA_fofmbvJn5Zm',
        'X-Naver-Client-Secret': 'gEWgSn8g2x'
      },
    };

    return this.httpService.get(api_url, { headers: options.headers }).pipe(
      map(response => response.data)
    );
  }
}
