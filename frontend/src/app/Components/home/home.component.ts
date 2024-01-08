import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



type AOA = any[][];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private api: ApiService, private formBuilder: FormBuilder,) { }

  style: String = '';
  selected_style: String = '';
  cnldata: any = [];
  bomdata:any [] = [];
  success: string = "";
  error: string ="";
  arraydata:any [] = [];
  loading:boolean = false;

  ngOnInit(): void {
  }

  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'Bom Automation Template.xlsx';


  onSubmit() {
    const style = {
      style: this.style,
    };

    //console.log(style);
    if (this.style.length>6){
      this.api.getPlmCnl(style).subscribe({
        next: (data: any) => {
          this.cnldata=data;
          console.log(this.cnldata);
        }, error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  onSelect() {
    const param = {
      style: this.style,
      bom_cnl: this.selected_style,
    };
    this.loading = true
    //console.log('Test1');
      //console.log(this.bomdata);
      this.api.getPlmBom(param).subscribe({
        next: (data: any) => {
          this.bomdata=data;
        //console.log(param);
        //console.log(data);
        //let datas = XLSX.utils.sheet_to_json(this.bomdata);
    
      //console.log(this.bomdata);
      /* generate worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const sheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([['', '', '', 'Packing Teamplate']
      ,['','','Input value','Input value','Input value','Input value','Input value','Input value','Input value','','','Input value','','','Input value','',],
      ['','','Mandatory','Mandatory','Mandatory','Mandatory','Mandatory','Mandatory','Mandatory','','','Mandatory','','','','',]]);
      XLSX.utils.sheet_add_json(sheet, this.bomdata, { origin: 3 });
      XLSX.utils.book_append_sheet(wb, sheet, 'Placemants');

      
      
      //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.bomdata);
      /* generate workbook and add the worksheet */
      
      // XLSX.utils.book_append_sheet(wb, ws, 'Placements');     

      // // Inserting a new row at the beginning
      // //XLSX.utils.sheet_add_aoa(ws, [['New Data', 'New Data', 'New Data']], { origin: 0 });
      // //XLSX.utils.sheet_add_aoa(ws, [['New Data', 'New Data', 'New Data']], { origin: 1 });
      // // Process Data (add a new row)
      // //var ws = workbook.Sheets["Sheet1"];
      // //XLSX.utils.sheet_add_aoa(ws,[[1]], {origin:-1});
     
      /* save to file */
      XLSX.writeFile(wb, this.fileName);
      this.loading = false
      this.success ="Bom Downloaded Successfully"



        }, error: (error: any) => {
          console.log(error);
        }   
      })
     
  }
}