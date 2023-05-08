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



@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css']
})
export class FilmStranicaComponent implements OnInit {
  
  

  constructor(public service:FilmsService, public storage:StorageService,public loginservice:LoginService, public bookmark:BookmarkStranicaComponent, public commentService:CommentsService, private toastr:ToastrService, public genreservice:GenreService) {}


  ratingOfFilm:number=0;
  
  ngOnInit(): void {
    this.changeToFilm();
    this.service.updateRating();

    setTimeout(this.openInfo,300)
  }
  selectedFilm:Films;
  genres:Genres[];
  genre:string[];
  Film_Genre:Film_Genre;
  listComments:Comments[];
  selectedComments:Comments[];
  AllUsers:Login[];
  username:string[];
  comment:string[];

  changeToFilm(){
    this.selectedFilm = this.service.getFilmByName();
    this.genre=this.genreservice.GenreForFilm(this.selectedFilm.id_film);
    this.listComments=this.commentService.getComments();
    this.AllUsers=this.loginservice.GetAllUsers();

    this.selectedComments=[];
    this.comment=[];
    this.username=[];

    for(var comments of this.listComments){
      if(this.selectedFilm.id_film == comments.id_film){
            this.selectedComments.push(comments);        
      } 
    }
    for(var comm of this.selectedComments){
      this.comment.push(comm.comment);
    }
    for(var user of this.AllUsers){
      for(var comuser of this.selectedComments){
        if(user.id_user==comuser.id_user){
          this.username.push(user.username);
        }
      }
    }
    console.log(this.username);
    console.log(this.selectedComments);
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
    if(this.storage.isLoggedIn()==true){
      let popup = document.getElementById("popup") as HTMLDivElement;
      popup.classList.add("open-popup");
    }
    else{
      this.toastr.error("You are not logged in!","Can't rate")
    }

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
  }

  saveComment(){
    const val = document.getElementById("commentInput") as HTMLInputElement;
    this.commentService.postComment(this.selectedFilm,val.value);
    val.value = "";
  }
}
