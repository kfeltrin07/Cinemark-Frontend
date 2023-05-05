import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Films } from './films.model';
import { environment } from 'src/environments/environment';
import { Comments } from './comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient, public storageService:StorageService) { }

  readonly baseURL = environment.baseURL+'api/Comments'
  formData:Comments = new Comments();

  postComment(film:Films, comment:string){
    const currentDate = new Date();
    const userID = this.storageService.getUserID();
    this.formData.change_date = currentDate;
    this.formData.insert_date = currentDate;
    this.formData.id_film = film.id_film;
    this.formData.comment = comment;
    this.formData.id_user = userID.id_user;

    console.log(this.formData);

    this.http.post(this.baseURL,this.formData).subscribe();

  }
}
