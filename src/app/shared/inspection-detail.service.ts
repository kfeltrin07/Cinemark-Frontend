import { Injectable } from '@angular/core';
import { Login } from './inspection-detail.model';
import { HttpClient } from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class InspectionDetailService {

  constructor(private http:HttpClient) { }

  formData:Login = new Login();
  readonly baseURL = 'https://localhost:7168/api/Logins'

  list : Login[];

  postLogins(){
    return this.http.post(this.baseURL,this.formData);
  }

  refreshList(){
    this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Login[]);
  }
  
}
