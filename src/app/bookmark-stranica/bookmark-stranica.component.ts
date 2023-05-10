import { Subscription, delay } from 'rxjs';
import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Bookmarks } from '../shared/bookmarks.model';
import { GenreService } from '../shared/genre.service';



@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})

export class BookmarkStranicaComponent {

  form: any = {
    id_user:null,
    id_film:null
  };

  bookmarks:any={
    id_bookmark:null,
    id_user:null,
    id_film:null
  }
  recommendedFilms: Films[];
  Films : Films[];
  isLoggedIn = false;
  selectedFilm:Films[];
  bookmark:Bookmarks[];
  check:boolean=false;

  constructor(public filmsService:FilmsService,public storageService:StorageService,private toastr:ToastrService, public bookmarkService: BookmarksService, 
    public genreService:GenreService) {

      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
        
      const user = this.storageService.getUser();
      const userID = this.storageService.getUserID();
      }
      this.filmsService.getFilms();
      this.getBookmarksByUser();    
      this.getRecommendedMovies();  
    }
 
  updateSelectedFilm(film:string){
    
    this.filmsService.updateFilmByName(film);
  }

  saveBookmarks(id_film:any){
    if(this.storageService.isLoggedIn()==true){
      var id=this.storageService.getUserID();
      this.form.id_user=id.id_user;
      this.form.id_film=id_film;
      this.bookmarkService.authBookmark(this.form).subscribe(
        res=>{
          this.bookmarkService.postBookmarks(this.form).subscribe(
            res=>{
              this.toastr.success("Added Bookmark");
              console.log("Added Bookmark");
              this.bookmarkService.getBookmarks();
              this.getBookmarksByUser();
              delay(5000);
              },
            err=>{
              console.log(err);
              console.log("Greška kod unosa");
              }
            );
            },
        err=>{
          this.toastr.success("Bookmark Removed");
          console.log("Već ste bookmarkali određen film");
          console.log(err);
          this.bookmarkService.getBookmarks();
          this.getBookmarksByUser();
          delay(5000);        
        });
    }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }

  getBookmarksByUser(){
    this.Films=[];
    const bookmark = this.storageService.getBookmarks();
    const filmsl = this.storageService.getFilms();
    
    console.log(bookmark);
    if(this.storageService.isLoggedIn()==true){
      const id_us= this.storageService.getUserID();
      for(var films of bookmark){
        if(films.id_user == id_us.id_user){
          for( var film of filmsl){
            if( films.id_film== film.id_film){
              this.Films.push(film);;
            }
          }
        }       
      }
    }
  }

  Checkifbookmarked(id_film:any){
    if(this.storageService.isLoggedIn()==true){
      var id=this.storageService.getUserID();
      this.form.id_user=id.id_user;
      this.form.id_film=id_film;
      this.bookmarkService.checkBookmark(this.form).subscribe(
        res=>{
          true;
            },
        err=>{
          false
        });
    }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }

  getRecommendedMovies(){
    this.recommendedFilms = [];
    const films = this.storageService.getFilms();
    do{
      //stavi checker na false u svakoj iteraciji
      this.check=false;

      //generiranje random broja od 0-20
      let x = Math.round(Math.random()*20);

      //prolaz kroz listu svih filmova
      for(var film of films){

        //ako je id filma isti random generiranom broju
        if(film.id_film == x){

          //provjera da li se ponavlja isti film u recommended listi
          for(var reclist of this.recommendedFilms){
            if(reclist.id_film == film.id_film){
              this.check=true;
            }
          }

          //provjera da li korisnik ima bookmarkan film (ako da onda nece biti u recommended listi)
          for(var booklist of this.Films){
            if(booklist.id_film == film.id_film){
              this.check=true;
            }
          }

          //ako je su sve provjere uspješno prošle dodaj recommended film u listu
          if(this.check==false){
            this.recommendedFilms.push(film);  
          } 
        }
      }
      //ponavljaj sve dok nemamo 4 filma
    }while(this.recommendedFilms.length<4);
  }
  
}






