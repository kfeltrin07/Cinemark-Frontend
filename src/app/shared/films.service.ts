import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Films } from './films.model';
import { RatingsService } from './ratings.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../_services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {


  constructor(private http:HttpClient, public ratingService:RatingsService, public storageService:StorageService) { }


  formData:Films = new Films();
  readonly baseURL = environment.baseURL+'api/Films'

  list : Films[];
  selectedFilm:Films;
  rating:number=0;
  increaseRating:number=0;
  increaseCount:number=0;
  check:boolean=false;
  loggedUser:any;

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
    this.rating=this.selectedFilm.total_rating/this.selectedFilm.rating_count;
  }

  postNewRating(newRating:number){

    this.checkIfVoted();
    
    if(this.check == false) {
      this.increaseRating = this.selectedFilm.total_rating + newRating;
      this.increaseCount = this.selectedFilm.rating_count + 1;

      this.selectedFilm.total_rating = this.increaseRating;
      this.selectedFilm.rating_count = this.increaseCount;

      this.formData = this.selectedFilm;
      console.log(this.formData.total_rating);
      console.log(this.formData.rating_count);
      this.http.put(`${this.baseURL}/${this.formData.id_film}`,this.formData).subscribe();

      this.loggedUser = this.storageService.getUser();
      this.ratingService.postRating(this.formData, this.loggedUser, newRating);

      this.updateRating();
    }
    else{
      alert("Already voted!");
    }
  }

  checkIfVoted(){
  }
    this.user = this.service.getUser();
  }

}
