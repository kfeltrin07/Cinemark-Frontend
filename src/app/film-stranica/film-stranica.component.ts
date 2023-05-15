import { Film_Genre } from '../_shared/film_genre.model';
import { GenreService } from '../_shared/genre.service';
import { BookmarkStranicaComponent } from './../bookmark-stranica/bookmark-stranica.component';
import { LoginService } from 'src/app/_shared/Login.service';
import { StorageService } from './../_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { Films } from '../_shared/films.model';
import { FilmsService } from '../_shared/films.service';
import { CommentsService } from '../_shared/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Genres } from '../_shared/genre.model';
import { Comments } from '../_shared/comments.model';
import { Login } from '../_shared/Login.model';
import { BookmarksService } from '../_shared/bookmarks.service';
import { RatingsService } from '../_shared/ratings.service';
import { UserStoreService } from '../_services/user-store.service';



@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css'],
})
export class FilmStranicaComponent{
  
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

  comment:any[];
  id_comment:number[];
  id_commuser:number[];

  date:any;
  bookmarked=false;
  isuser=false;
  User:any;
  public id_user$:string="";


  constructor(public service:FilmsService, public storageService:StorageService,public loginservice:LoginService, public bookmark:BookmarkStranicaComponent, 
    public commentService:CommentsService, private toastr:ToastrService, public genreservice:GenreService, public ratingService:RatingsService, 
    public bookmarkService:BookmarksService, private userstore:UserStoreService) 
    {
      this.userstore.getIDUserFromStore()
      .subscribe(val=>{
        let id_userFromToken=this.loginservice.getIDUserFromToken();
        this.id_user$=val||id_userFromToken
      })
      this.selectedFilm = this.storageService.getFilm();
      this.genre=this.genreservice.GenreForFilm(this.selectedFilm.id_film);
      this.commentService.getComments();
      this.loginservice.GetAllUsers();
      this.service.updateRating();
      this.changeToFilm();
      this.Checkifbookmarked();
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(this.openInfo,400)
    }


  

  changeToFilm(){
    const listcomments=this.storageService.getComments();
    const Allusers=this.storageService.getUsers();
    this.selectedComments=[];
    this.comment=[];
    this.username=[];
    this.date=[];
    this.id_comment=[];
    this.id_commuser=[];

    if(listcomments!=null){
      for(var comments of listcomments){
        if(this.selectedFilm.id_film == comments.id_film){
              this.selectedComments.push(comments);        
        } 
      }
      for(var comm of this.selectedComments){
        this.comment.push(comm);
        this.date.push(comm.insert_date);
      }
      for(var comuser of this.selectedComments){
        for(var user of Allusers){
          if(user.id_user==comuser.id_user){
            this.username.push(user.username);
          }
        }
      }
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

    if(this.storageService.isLoggedIn()==true){

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
    else{
      this.toastr.error("You can't rate if you are not logged in!", "Rating error.")
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
    
  }

  Checkifbookmarked(){
    if(this.storageService.isLoggedIn()==true){
      const filmid=this.storageService.getFilm();
      this.form.id_user=this.id_user$;
      this.form.id_film=filmid.id_film;
      this.bookmarkService.checkBookmark(this.form).subscribe(
        res=>{
          this.bookmarked=true;
            },
        err=>{
          this.bookmarked=false;
        });
    }
  }

  deleteComment(id:number,usid:number){
    console.log(id);
      if(this.User.role==1){
          this.commentService.deleteComment(id);
          this.toastr.success("User's comment will be permanently deleted after refresh");
          history.go(0);
      }
      else if (+this.id_user$==usid) {
          this.commentService.deleteComment(id);
          this.toastr.success("User's comment will be permanently deleted after refresh");
          history.go(0);
      } else {
        this.toastr.error("You cannot delete this comment");
        
      }
  }
}
