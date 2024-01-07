import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type AOA = any[][];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private api: ApiService, private formBuilder: FormBuilder) {}

  style: String = '';
  selected_style: String = '';
  cnldata: any = [];
  bomdata: any[] = [];
  success: string = '';
  error: string = '';
  arraydata: any[] = [];
  loading: boolean = false;

  ngOnInit(): void {}

  data: AOA = [
    [1, 2],
    [3, 4],
  ];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'Bom Automation Template.xlsx';

  onSubmit() {
    const style = {
      style: this.style,
    };

    //console.log(style);
    if (this.style.length > 6) {
      this.api.getPlmCnl(style).subscribe({
        next: (data: any) => {
          this.cnldata = data;
          console.log(this.cnldata);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  onSelect() {
    const param = {
      style: this.style,
      bom_cnl: this.selected_style,
    };
    this.loading = true;
    //console.log('Test1');
    //console.log(this.bomdata);
    this.api.getPlmBom(param).subscribe({
      next: (data: any) => {
        this.bomdata = data;
        //console.log(param);
        //console.log(data);
        //let datas = XLSX.utils.sheet_to_json(this.bomdata);

        console.log(this.bomdata);
        /* generate worksheet */
        // Create a new workbook using exceljs
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Placements');

    worksheet.getCell('D1').value = 'Packing Template';
    worksheet.mergeCells('D1', 'F1');
    worksheet.getRow(2).values = [
      '',
      '',
      'Input value',
      'Input value',
      'Input value',
      'Input value',
      'Input value',
      'Input value',
      'Input value',
      '',
      '',
      'Input value',
      '',
      '',
      'Input value',
      '',
    ];
    worksheet.getRow(3).values = [
      '',
      '',
      'Mandatory',
      'Mandatory',
      'Mandatory',
      'Mandatory',
      'Mandatory',
      'Mandatory',
      'Mandatory',
      '',
      '',
      'Mandatory',
      '',
      '',
      '',
      '',
    ];

    // Add JSON data to the worksheet using exceljs
    // this.bomdata.forEach((data, index) => {
    //   const rowNumber = index + 4; // Assuming JSON data starts from row 4
    //   worksheet.addRow(data, `A${rowNumber}`);
    // });

    // Set the cell style of D1 to have a yellow background color

    if (data.length > 0) {
      let Output1headers = Object.keys(data[0]);

      for (let i = 0; i < Output1headers.length; i++) {
        worksheet.getCell(4, i + 1).value = Output1headers[i];
        worksheet.getCell(4, i + 1).font = {bold: true}
        worksheet.getCell(4, i + 1).border = {
          top: {style:'thin'},
          left: {style:'thin'},
          bottom: {style:'thin'},
          right: {style:'thin'}
        };
      }

      let dataset = data.map(Object.values);

      for (let j = 0; j < dataset.length; j++) {
        for (let i = 0; i < Output1headers.length; i++) {
          worksheet.getCell(j + 5, i + 1).value = dataset[j][i];
        }
      }
    }

    for(let j = 2; j < 9; j++){
      worksheet.getCell(2, j + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF00',
        },
      };
      worksheet.getCell(2, j + 1).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
    }

    for(let j = 2; j < 9; j++){
      worksheet.getCell(3, j + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF00',
        },
      };
      worksheet.getCell(3, j + 1).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
    }

    for(let j = 2; j < 9; j++){
      worksheet.getCell(4, j + 1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF00',
        },
      };
      worksheet.getCell(4, j + 1).border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
    }

    worksheet.getCell('L2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };
    worksheet.getCell('L2').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };

    worksheet.getCell('L3').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };
    worksheet.getCell('L3').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };

    worksheet.getCell('L4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };

    worksheet.getCell('L4').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };

    worksheet.getCell('O2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF00' },
    };
    worksheet.getCell('O2').border = {
      top: {style:'thin'},
      left: {style:'thin'},
      bottom: {style:'thin'},
      right: {style:'thin'}
    };


    // Save the workbook to a file using FileSaver.js
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, this.fileName);
      console.log('File saved!');
    });

        this.loading = false;
        this.success = 'Bom Downloaded Successfully';
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
