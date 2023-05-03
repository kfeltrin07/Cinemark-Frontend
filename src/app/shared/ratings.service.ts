import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ratings } from './ratings.model';
import { environment } from 'src/environments/environment.development';
import { getLocaleDateFormat } from '@angular/common';
import { Films } from './films.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http:HttpClient) { }

  formData:Ratings = new Ratings();
  readonly baseURL = environment.baseURL+'api/Ratings/'

  list : Ratings[];

  postRating(film:Films, user:any,rating:number){
    const currentDate = new Date();
    this.formData.change_date = currentDate;
    this.formData.insert_date = currentDate;
    this.formData.id_film = film.id_film;
    this.formData.rating = rating;
    this.formData.id_user = user.id_user;
    this.http.post(this.baseURL,this.formData,{ withCredentials: true }).subscribe();
  }

  getRatings(){
    this.http.get(this.baseURL,{ withCredentials: true }).toPromise().then(
      res => this.list = res as Ratings[]);
  }
}
