/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PlmBomDownloadController } from './controllers/plm-bom-download.controller';
import { PlmBomDownloadService } from './services/plm-bom-download.services';

@Module({
    controllers: [PlmBomDownloadController],
    providers: [PlmBomDownloadService]
  })
  export class PlmBomDownloadModule {}
