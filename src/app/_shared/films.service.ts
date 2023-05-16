import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Films } from './films.model';
import { RatingsService } from './ratings.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Ratings } from './ratings.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  


  constructor(private http:HttpClient, public ratingService:RatingsService, public storageService:StorageService,
    private toastr:ToastrService) { }


  formData:Films = new Films();
  readonly baseURL = environment.baseURL+'api/Films'

  list : Films[];
  selectedFilm:Films;
  rating:number=0;
  increaseRating:number=0;
  increaseCount:number=0;
  check:boolean=false;
  changeRating:number=0;

  user: any;

  searchFilms: Films[];

  getFilms(){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res =>{this.list = res as Films[];
          this.storageService.saveFilms(this.list);
      });
  }

  updateFilmByName(filmName:string){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res => this.list = res as Films[]);
      for(var film of this.list){
        if(film.title == filmName){
          this.selectedFilm = film;
          this.storageService.saveFilm(this.selectedFilm);
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
    const film= this.storageService.getFilm();
    this.rating=film.total_rating/film.rating_count;
    this.ratingService.getRatings();
  }

  postNewRating(newRating:number){
    const film= this.storageService.getFilm();
    this.selectedFilm=film;
    this.ratingService.getRatings();
    this.checkIfVoted();
    
    if(this.check == false) {
      this.increaseRating = this.selectedFilm.total_rating + newRating;
      this.increaseCount = this.selectedFilm.rating_count + 1;

      this.selectedFilm.total_rating = this.increaseRating;
      this.selectedFilm.rating_count = this.increaseCount;

      this.storageService.saveFilm(this.selectedFilm);

      this.formData = this.selectedFilm;
      
      this.http.put(`${this.baseURL}/${this.formData.id_film}`,this.formData).subscribe();

      this.ratingService.postRating(this.formData, newRating);

      this.updateRating();
      this.toastr.success('Ratings saved.','Thank you!')
    }
    else{
      this.increaseRating = this.selectedFilm.total_rating + newRating - this.changeRating;
      this.selectedFilm.total_rating = this.increaseRating;
      this.formData = this.selectedFilm;
      this.storageService.saveFilm(this.selectedFilm);
      this.http.put(`${this.baseURL}/${this.formData.id_film}`,this.formData).subscribe();
      this.ratingService.postRating(this.formData, newRating);
      this.updateRating();
      this.toastr.success('Rating changed!','Thank you for voting.');
    }
  }

  checkIfVoted(){
    const user = this.storageService.getUserID();
    const film=this.storageService.getFilm();
    const ratings = this.storageService.getRatings();
    this.check = false;

    for(var rating of ratings){
      if(film.id_film == rating.id_film && user.id_user == rating.id_user){
        this.check = true;
        this.changeRating = rating.rating;
      }
    }
  }

  newMovie(film:Films): Observable<any> {
    return this.http.post<any>(`${this.baseURL}`,film,httpOptions);
  }
   
}
