import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `${environment.api}`;

  constructor(private http : HttpClient) { }

  updateBomTemplate(){
    return this.http.get<any>(`${this.apiUrl}/bom-upload/bom`);
  }

}
