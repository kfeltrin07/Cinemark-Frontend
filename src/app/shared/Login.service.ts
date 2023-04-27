import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Login } from './Login.model';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { env } from 'process';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http:HttpClient) { }

  formData:Login = new Login();
  readonly baseURL = environment.baseURL+'/api/Users/'

  list : Login[];

  postLogins(){
    return this.http.post(this.baseURL,this.formData);
  }

  putLogins(){
    return this.http.put(`${this.baseURL}/${this.formData.id_user}`,this.formData);
  }

  deleteLogin(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);

  }
  
  authenticate(login:any){
    return this.http.post<any>(`${this.baseURL}authenticate`,this.formData);
  }


  refreshList(){
    this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Login[]);
  }
  
}
