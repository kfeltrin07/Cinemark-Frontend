import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Films } from './films.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient) { }

  formData:Films = new Films();
  readonly baseURL = environment.baseURL+'/api/Films/'

  list : Films[];

  getFilms(){
    this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Films[]);
  }

}
