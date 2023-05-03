import { Injectable } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Login } from './Login.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private http:HttpClient) { }

  formData:Login = new Login();
  readonly baseURL = environment.baseURL+'api/Users/'

  list : Login[];

  postLogins(): Observable<any>{
    return this.http.post(this.baseURL,this.formData,httpOptions);
  }

  putLogins(){
    return this.http.put(`${this.baseURL}/${this.formData.id_user}`,this.formData,{ withCredentials: true });
  }

  deleteLogin(id:number){
    return this.http.delete(`${this.baseURL}/${id}`,{ withCredentials: true });

  }
  
  authenticate(login:any): Observable<any>{
    return this.http.post<any>(`${this.baseURL}authenticate`,this.formData,httpOptions);
  }


  refreshList(){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res => this.list = res as Login[]);
  }
  
}
