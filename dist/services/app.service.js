"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cheerio_1 = require("cheerio");
const rxjs_1 = require("rxjs");
const lodash_1 = require("lodash");
const flat_info_1 = require("../models/flat-info");
const PROHIBITED_LOCATIONS = ['Pissouri'];
let AppService = class AppService {
    constructor(__httpService) {
        this.__httpService = __httpService;
        this.__flatsList = [];
    }
    async getList() {
        const flatInfos = await this.__getFlatInfos();
        const candidates = flatInfos
            .filter((flatInfo) => flatInfo.price < 1600)
            .filter((flatInfo) => !PROHIBITED_LOCATIONS.some((location) => flatInfo.dateAndLocation.includes(location)))
            .filter((flatInfo) => flatInfo.dateAndLocation.includes('Today'));
        const diff = (0, lodash_1.differenceBy)(candidates, this.__flatsList, (item) => item.link);
        this.__flatsList = [...this.__flatsList, ...diff];
        return diff;
    }
    async __getFlatInfos() {
        const flatsInfo = [];
        const response = await (0, rxjs_1.lastValueFrom)(this.__httpService.get('https://www.bazaraki.com/real-estate-to-rent/apartments-flats/number-of-bedrooms---0/number-of-bedrooms---1/number-of-bedrooms---2/lemesos-district-limassol/?price_max=1750'));
        if (response.status !== 200)
            throw new Error('Invalid response code');
        const html = response.data;
        const $ = (0, cheerio_1.load)(html);
        $('.list-simple__output .announcement-container').each((i, item) => {
            const price = +$(item)
                .find('.announcement-block__price')
                .text()
                .trim()
                .replace('€', '')
                .replace('.', '');
            if (Number.isNaN(price))
                return;
            const link = $(item).find('a.mask').attr('href');
            const dateAndLocation = $(item)
                .find('.announcement-block__date')
                .text()
                .trim()
                .replace('            ', '');
            flatsInfo.push(new flat_info_1.FlatInfo(price, link, dateAndLocation));
        });
        return flatsInfo;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map