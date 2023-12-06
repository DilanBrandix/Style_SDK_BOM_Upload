import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `${environment.api}`;

  constructor(private http : HttpClient) { }

  getPlmCnl(style: any){
    //const body = {style:style}
    return this.http.post<any>(`${this.apiUrl}/plm-bom-download/plm_bom_cnl`,style);
  }

  getPlmBom(style: string,bom_cnl : string){
    //const body = {style:style,bom_cnl:bom_cnl}
    return this.http.post<any>(`${this.apiUrl}/plm-bom-download/plm_bom_details`,style);
  }

}
