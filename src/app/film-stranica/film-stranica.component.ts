import { Film_Genre } from './../shared/film_genre.model';
import { GenreService } from './../shared/genre.service';
import { BookmarkStranicaComponent } from './../bookmark-stranica/bookmark-stranica.component';
import { LoginService } from 'src/app/shared/Login.service';
import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Films } from '../shared/films.model';
import { FilmsService } from '../shared/films.service';
import { CommentsService } from '../shared/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Genres } from '../shared/genre.model';
import { Comments } from '../shared/comments.model';
import { Login } from '../shared/Login.model';
import { BookmarksService } from '../shared/bookmarks.service';
import { RatingsService } from '../shared/ratings.service';



@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css'],
  //providers: [FilmsService,GenreService,BookmarksService,LoginService,CommentsService]
})
export class FilmStranicaComponent{
  
  

  constructor(public service:FilmsService, public storageService:StorageService,public loginservice:LoginService, public bookmark:BookmarkStranicaComponent, 
    public commentService:CommentsService, private toastr:ToastrService, public genreservice:GenreService, public ratingService:RatingsService, public bookmarkService:BookmarksService) 
    {
      this.selectedFilm = this.storageService.getFilm();
      this.genre=this.genreservice.GenreForFilm(this.selectedFilm.id_film);
      this.commentService.getComments();
      this.loginservice.GetAllUsers();
      this.changeToFilm();
      this.service.updateRating();
      this.Checkifbookmarked();
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(this.openInfo,400)

    }


  ratingOfFilm:number=0;
  
  form: any = {
    id_user:null,
    id_film:null
  };

  selectedFilm:Films;
  genres:Genres[];
  genre:string[];
  Film_Genre:Film_Genre;
  listComments:Comments[];
  selectedComments:Comments[];
  AllUsers:Login[];
  username:string[];
  comment:string[];
  date:string[];
  bookmarked=false;

  changeToFilm(){
    
    const listcomments=this.storageService.getComments();
    const Allusers=this.storageService.getUsers();
    this.selectedComments=[];
    this.comment=[];
    this.username=[];
    this.date=[];
    console.log(Allusers);

    if(listcomments!=null){
      for(var comments of listcomments){
        if(this.selectedFilm.id_film == comments.id_film){
              this.selectedComments.push(comments);        
        } 
      }
      for(var comm of this.selectedComments){
        this.comment.push(comm.comment);
      }
      for(var comuser of this.selectedComments){
        for(var user of Allusers){
          if(user.id_user==comuser.id_user){
            this.username.push(user.username);
            this.date.push(user.insert_date);
          }
        }
      }
      console.log(this.username);
      console.log(this.selectedComments);
    }
    else{
      console.log("there are no comments");
    }

    
  }

  openInfo(){
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.remove("hide-details");
  }

  closeInfo(){
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.add("hide-details");
  }

  trailer(){
    window.open(this.selectedFilm.video_url,"_blank");
  } 

  openPopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.add("open-popup");
  }

  closePopup(){
    let popup = document.getElementById("popup") as HTMLDivElement;
    
    popup.classList.remove("open-popup");
    
    var rate1 = document.getElementById("rate-1") as HTMLInputElement;
    var rate2 = document.getElementById("rate-2") as HTMLInputElement;
    var rate3 = document.getElementById("rate-3") as HTMLInputElement;
    var rate4 = document.getElementById("rate-4") as HTMLInputElement;
    var rate5 = document.getElementById("rate-5") as HTMLInputElement;

    if(rate1.checked){
      this.ratingOfFilm=parseInt(rate1.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate2.checked){
      this.ratingOfFilm=parseInt(rate2.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate3.checked){
      this.ratingOfFilm=parseInt(rate3.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate4.checked){
      this.ratingOfFilm=parseInt(rate4.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }
    if(rate5.checked){
      this.ratingOfFilm=parseInt(rate5.value,10);
      this.service.postNewRating(this.ratingOfFilm);
    }  
    
  }

  saveBookmark(id_film:any){
    console.log(id_film)
    this.bookmark.saveBookmarks(id_film);
    this.Checkifbookmarked();
  }

  saveComment(){
    const val = document.getElementById("commentInput") as HTMLInputElement;
    this.commentService.postComment(this.selectedFilm,val.value);
    val.value = "";
    this.commentService.getComments();
    history.go(0);
  }

  Checkifbookmarked(){
    if(this.storageService.isLoggedIn()==true){
      const id=this.storageService.getUserID();
      const filmid=this.storageService.getFilm();
      this.form.id_user=id.id_user;
      this.form.id_film=filmid.id_film;
      this.bookmarkService.checkBookmark(this.form).subscribe(
        res=>{
          this.bookmarked=true;
          
          console.log("movie is bookmared");
            },
        err=>{
          this.bookmarked=false;
          console.log("movie is not bookmared");
        });
    }
  }
}
