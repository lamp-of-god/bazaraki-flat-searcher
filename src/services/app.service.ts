import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { load } from 'cheerio';
import { lastValueFrom } from 'rxjs';
import { differenceBy } from 'lodash';
import { FlatInfo } from 'src/models/flat-info';

const PROHIBITED_LOCATIONS = ['Pissouri'];

@Injectable()
export class AppService {
  private __flatsList: FlatInfo[] = [];

  constructor(private readonly __httpService: HttpService) {}

  async getList(): Promise<FlatInfo[]> {
    const flatInfos = await this.__getFlatInfos();

    const candidates = flatInfos
      .filter((flatInfo) => flatInfo.price < 1600)
      .filter(
        (flatInfo) =>
          !PROHIBITED_LOCATIONS.some((location) =>
            flatInfo.dateAndLocation.includes(location),
          ),
      )
      .filter((flatInfo) => flatInfo.dateAndLocation.includes('Today'));

    const diff = differenceBy(
      candidates,
      this.__flatsList,
      (item: FlatInfo) => item.link,
    );

    this.__flatsList = [...this.__flatsList, ...diff];

    return diff;
  }

  private async __getFlatInfos(): Promise<FlatInfo[]> {
    const flatsInfo = [];

    const response = await lastValueFrom(
      this.__httpService.get(
        'https://www.bazaraki.com/real-estate-to-rent/apartments-flats/number-of-bedrooms---0/number-of-bedrooms---1/number-of-bedrooms---2/lemesos-district-limassol/?price_max=1750',
      ),
    );

    if (response.status !== 200) throw new Error('Invalid response code');

    const html = response.data;
    const $ = load(html);

    $('.list-simple__output .announcement-container').each((i, item) => {
      const price = +$(item)
        .find('.announcement-block__price')
        .text()
        .trim()
        .replace('€', '')
        .replace('.', '');

      if (Number.isNaN(price)) return;

      const link = $(item).find('a.mask').attr('href');

      const dateAndLocation = $(item)
        .find('.announcement-block__date')
        .text()
        .trim()
        .replace('            ', '');

      flatsInfo.push(new FlatInfo(price, link, dateAndLocation));
    });

    return flatsInfo;
  }
}
