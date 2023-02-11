import { HttpService } from '@nestjs/axios';
import { FlatInfo } from 'src/models/flat-info';
export declare class AppService {
    private readonly __httpService;
    private __flatsList;
    constructor(__httpService: HttpService);
    getList(): Promise<FlatInfo[]>;
    private __getFlatInfos;
}
