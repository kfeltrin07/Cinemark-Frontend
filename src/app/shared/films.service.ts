import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Films } from './films.model';
import { environment } from 'src/environments/environment';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http:HttpClient, public service:StorageService) { }

  formData:Films = new Films();
  readonly baseURL = environment.baseURL+'api/Films'

  list : Films[];
  selectedFilm:Films;
  user: any;
  searchFilms: Films[];


  getFilms(){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res => this.list = res as Films[]);
      
  }

  updateFilmByName(filmName:string){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
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

  getSearchedFilms(searchInput:string){
      
      this.searchFilms = [];
    
      for(var item of this.list){
          if(searchInput.toLowerCase() == item.title.toLowerCase()){
            this.searchFilms.push(item);
            break;
          }
          if(searchInput.length == 1){
            if(searchInput[0].toLowerCase() == item.title[0].toLowerCase()){
              this.searchFilms.push(item);
            }
          }
          else{
            if(searchInput[0].toLowerCase() == item.title[0].toLowerCase() && searchInput[1].toLowerCase() == item.title[1].toLowerCase())
            this.searchFilms.push(item);
          }

      }
  }

  updateRating(){
    this.user = this.service.getUser();
  }

}
