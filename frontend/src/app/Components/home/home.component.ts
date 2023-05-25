import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/services/api.service';

type AOA = any[][];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private api:ApiService) { }
  loading:boolean = false;
  uploadloading:boolean = false;
  uploadsuccess: string = "";
  success: string = "";
  error: string ="";

  arraydata:any [] = [];

  ngOnInit(): void {
  }
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'Bom Output Template.xlsx';

  onFileChange(evt: any) {
    /* wire up file reader */
    this.uploadloading = true
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      // const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets['BOM Data'];

      /* save data */
      //this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      let datas = XLSX.utils.sheet_to_json(ws);

      const gen:any []=[];
      datas.map((h: any) => {
          if(h.Item == 'GEN'){
            const data = h['Item'];
            gen.push(data);
          }
      });
      let num:number = gen.length;

      num = (num*(-1));
      // console.log(num);
      datas = datas.slice(0,num);

      datas = datas.map((f:any)=>{
        return {
          "Item": f['Item'],
         "SFCS Operation": f['SFCS Operation'] ?? '',
          "FG Color": f['FG Color'],
          "FG Size Code": f['FG Size Code'],
          "FG Z Code": f['FG Z Ftr'],
          "RM Color Code": f['RM Color Code'],
          "RM Size Code": f["RM Size Code"],
          "RM Z Code": f['RM Z Code'],
          "Product Alternative": f['Product Alternative'],
          "Purchase Agreement": f['Purchase Agreement'],
          "From Date": f['From Date'],
          "Consumption": f['Consumption'],
          "Wastage": f['Wastage'],
          "Placement": f['Placement'],
          "Supplier Code":f['Supplier Code'],
        };
      });

      this.arraydata = datas;
      console.log(this.arraydata);
    this.uploadloading = false
    this.uploadsuccess ="Bom Uploaded Successfully"
    };
    reader.readAsBinaryString(target.files[0]);

  }


  export(): void {
    this.loading = true
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.arraydata);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Output');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loading = false
    this.success ="Bom Downloaded Successfully"
  }

  // updateBom(){
  //   this.loading = true
  //   this.api.updateBomTemplate().subscribe({
  //     next:(res)=>{
  //       console.log(res);
  //       this.loading = false
  //       this.success ="Bom Updated Successfully";
  //     },
  //     error:(err)=>{
  //       this.loading = false;
  //       this.error = err.statusText;
  //       console.log(err.status,err.statusText);
  //     }
  //   })
  // }

}
