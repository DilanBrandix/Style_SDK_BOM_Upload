/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BomUploadModule } from './bom-upload/bom-upload.module';
import { PlmBomDownloadModule } from './plm-bom-download/plm-bom-download.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'PLM_db',
      type: 'mssql',
      host: '10.227.241.27',
      username: 'elixir_admin',
      password: 'welcome#123',
      database: 'Elixir',
      autoLoadEntities: true,
      synchronize: false,
      options: {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
        encrypt: false,
      },
    }),
    BomUploadModule,PlmBomDownloadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
