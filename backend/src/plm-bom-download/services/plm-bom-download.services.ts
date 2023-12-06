/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm'

@Injectable()
export class PlmBomDownloadService {
    constructor(
        @InjectDataSource('PLM_db') private plmDataSource: DataSource) {
    }
    async getBomCNL(style:string) { 
        const plm_data = await this.plmDataSource.query(`exec PLM_style_workflow '${style}'`,);
        return plm_data;
    }
    async getBomDetails(style:string,bom_cnl:string) { 
        const plm_bom = await this.plmDataSource.query(`exec PLM_BOM_Extract '${style}','${bom_cnl}'`,);
        return plm_bom;
    }


}