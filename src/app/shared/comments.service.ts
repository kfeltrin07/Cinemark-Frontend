import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Films } from './films.model';
import { environment } from 'src/environments/environment';
import { Comments } from './comments.model';
import { Bookmarks } from './bookmarks.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient, public storageService:StorageService, public toastr:ToastrService) { }

  readonly baseURL = environment.baseURL+'api/Comments'
  formData:Comments = new Comments();

  listComments:Comments[];


  postComment(film:Films, comment:string){
    const currentDate = new Date();
    if(this.storageService.isLoggedIn()==true){
    const userID = this.storageService.getUserID();
    this.formData.change_date = currentDate;
    this.formData.insert_date = currentDate;
    this.formData.id_film = film.id_film;
    this.formData.comment = comment;
    this.formData.id_user = userID.id_user;

    console.log(this.formData);

    this.http.post(this.baseURL,this.formData).subscribe();
    this.toastr.success("Comment posted.","Success!")
    history.go(0);
    }
    else{
      this.toastr.error("You Can't comment if you are not logged in");
      console.error("You Can't comment if you are not logged in");
    }
  }

  getComments(){
    this.http.get(this.baseURL).toPromise().then(
      res =>{ this.listComments = res as Comments[];
              console.log(res);
              console.log(this.listComments); 
              this.storageService.saveComments(this.listComments);
      })  
  }


    
}
