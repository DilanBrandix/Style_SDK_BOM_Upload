import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BomUploadService } from '../services/bom-upload.service';

@Controller('bom-upload')
export class BomUploadController {
  constructor(private bomservice: BomUploadService) {}

  @Get('bom')
  async updateOrderbookDetailsDelayReasons() {
    return this.bomservice.updateBom();
  }
}
