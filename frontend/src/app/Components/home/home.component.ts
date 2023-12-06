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

  ngOnInit(): void {
  }
  onSubmit() {
    const style = {
      style: this.style,
    };

    //console.log(style);
    this.api.getPlmCnl(style).subscribe({
      next: (data: any) => {
        this.cnldata=data;
        console.log(this.cnldata);
      }, error: (error: any) => {
        console.log(error);
      }
    })
  }
  // onSelect() {
  // }
}