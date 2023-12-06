/* eslint-disable prettier/prettier */
import {
    Controller,
    Body,
    Param,
    Post,
    Get
  } from '@nestjs/common';
  import { PlmBomDownloadService } from '../services/plm-bom-download.services';
@Controller('plm-bom-download')
export class PlmBomDownloadController{

  constructor(private plmbomdownload: PlmBomDownloadService) {
}
@Post('plm_bom_cnl')
  findBomcnl(@Body() data): Promise<any> {
    return this.plmbomdownload.getBomCNL(data.style);
  }

  @Post('plm_bom_details')
  findBomDetails(@Body() data): Promise<any> {
    return this.plmbomdownload.getBomDetails(data.style,data.bom_cnl);
  }
}