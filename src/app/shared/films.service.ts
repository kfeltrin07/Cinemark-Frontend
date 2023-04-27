import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Films } from './films.model';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient) { }

  formData:Films = new Films();
  readonly baseURL = 'https://localhost:7168/api/Films'

  list : Films[];
  selectedFilm:Films;

  getFilms(){
    this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Films[]);
  }

  updateFilmByName(filmName:string){
    this.http.get(this.baseURL).toPromise().then(
      res => this.list = res as Films[]);

      for(var film of this.list){
        if(film.title == filmName){
          this.selectedFilm = film;
        }
      }
  }

  getFilmByName(){
    return this.selectedFilm;
  }

}
