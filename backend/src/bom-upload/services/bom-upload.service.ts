/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
const fs = require('fs-extra');

@Injectable()
export class BomUploadService {
  
  async updateBom() {

    //const sharedDirectory = `\\\\10.150.152.17\\PVH_GTN_Manual_OB$`;
     const sharedDirectory=`C:\\Users\\DilanP\\Desktop\\boms`
    const listoforderbooks: string[] = [];
    let latestorderbook = '';

    const exists = await fs.pathExists(sharedDirectory);

    if (!exists) {
      throw new HttpException(
        'No files in the directory',
        HttpStatus.BAD_REQUEST,
      );
    }

    const listoffiles = await fs.readdir(sharedDirectory);
    listoffiles.forEach((fileName) => {
      const fileNameInlowercase = fileName.toLowerCase();
      if (fileNameInlowercase.startsWith('upload_bom')) {
        listoforderbooks.push(fileName);
      }
    });

    if (listoforderbooks.length < 1) {
      throw new HttpException(
        'No order book reports in the directory',
        HttpStatus.BAD_REQUEST,
      );
    }
    latestorderbook = listoforderbooks[0];
    let latestOrderBookNumber = 0;

    for (const orderBookFileName of listoforderbooks) {
      const slicedOrderBookFileName = orderBookFileName.slice(10);
      const slicedOrderBookWithoutExt: any = slicedOrderBookFileName.slice(
        0,
        -5,
      );
      if (!isNaN(slicedOrderBookWithoutExt)) {
        if (latestOrderBookNumber < Number(slicedOrderBookWithoutExt)) {
          latestorderbook = orderBookFileName;
          latestOrderBookNumber = Number(slicedOrderBookWithoutExt);
        }
      }
    }
    latestorderbook = sharedDirectory + '\\' + latestorderbook;
    const buf = await fs.readFile(latestorderbook);
    const wb = xlsx.read(buf, { type: 'buffer' });
    const orderBook = wb.Sheets['BOM Data'];
    let orderBookData = xlsx.utils.sheet_to_json(orderBook);

    const gen:any []=[];
    orderBookData.map((h: any) => {
        if(h.Item == 'GEN'){
          const data = h['Item'];
          gen.push(data);
        }
    });
    let num:number = gen.length;

    num = (num*(-1));
    // console.log(num);
    orderBookData = orderBookData.slice(0,num);

    // console.log(orderBookData);
    orderBookData = orderBookData.map((f: any) => {
      // console.log(f['Min CO Sts'])
      return {
        Item: f['Item'],
        SFCS_Operation: f['SFCS Operation'] ?? '',
        FG_Color: f['FG Color'],
        FG_Size_Code: f['FG Size Code'],
        FG_Z_Ftr: f['FG Z Ftr'],
        RM_Color_Code: f['RM Color Code'],
        RM_Size_Code: f["RM Size Code"],
        RM_Z_Code: f['RM Z Code'],
        Product_Alternative: f['Product Alternative'],
        Purchase_Agreement: f['Purchase Agreement'],
        From_Date: f['From Date'],
        Consumption: f['Consumption'],
        Wastage: f['Wastage'],
        Placement: f['Placement'],
        Supplier_Code:f['Supplier Code'],
      };
    });

    const exportBomFile = async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Output');
    
      worksheet.columns = [
        { key: 'Item', header: 'Item' },
        { key: 'SFCS_Operation', header: 'SFCS Operation' },
        { key: 'FG_Color', header: 'FG Color' },
        { key: 'FG_Size_Code', header: 'FG Size Code' },
        { key: 'FG Z Code', header: 'FG Size Code' },
        { key: 'RM_Color_Code', header: 'RM Color Code' },
        { key: 'RM_Size_Code', header: 'RM Size Code' },
        { key: 'RM_Z_Code', header: 'RM Z Code' },
        { key: 'Product_Alternative', header: 'Product Alternative' },
        { key: 'Purchase_Agreement', header: 'Purchase Agreement' },
        { key: 'From_Date', header: 'From Date' },
        { key: 'Consumption', header: 'Consumption' },
        { key: 'Wastage', header: 'Wastage' },
        { key: 'Placement', header: 'Placement' },
        { key: 'Supplier_Code', header: 'Supplier Code' },
      ];
    
      orderBookData.forEach((item) => {
        worksheet.addRow(item);
      });

      worksheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "2F75B5", }
        
    };

    worksheet.getRow(1).font = {
      color: {argb:"ffffff"},
      size: 10,
      name: 'Microsoft Sans Serif'
  };
    
      const exportPath = path.resolve(sharedDirectory, 'Bom Output Template.xlsx');
    
      await workbook.xlsx.writeFile(exportPath);
    };
    
    exportBomFile();

    return true;
  }
}
