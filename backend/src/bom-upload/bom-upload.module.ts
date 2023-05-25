import { Module } from '@nestjs/common';
import { BomUploadController } from './controllers/bom-upload.controller';
import { BomUploadService } from './services/bom-upload.service';

@Module({
  controllers: [BomUploadController],
  providers: [BomUploadService]
})
export class BomUploadModule {}
