import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BomUploadModule } from './bom-upload/bom-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'bli_db',
      type: 'mssql',
      host: '10.227.241.27',
      username: 'sa',
      password: 'BliPass@SQL',
      database: 'Rapid',
      autoLoadEntities: true,
      synchronize: false,
      options: {
        cryptoCredentialsDetails: {
          minVersion: 'TLSv1',
        },
        encrypt: false,
      },
    }),
    BomUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
