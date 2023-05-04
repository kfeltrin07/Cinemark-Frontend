import { Subscription } from 'rxjs';
import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { StorageService } from '../_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { Bookmarks } from '../shared/bookmarks.model';



@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})

export class BookmarkStranicaComponent implements OnInit {

  form: any = {
    id_user:null,
    id_film:null
  };

  bookmarks:any={
    id_bookmark:null,
    id_user:null,
    id_film:null
  }
  Films : Films[];
  

  constructor(public service:FilmsService,public storage:StorageService,private toastr:ToastrService, public bookmarkservice: BookmarksService) {}

  ngOnInit(): void {
    
    this.getBookmarksByUser();
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  saveBookmarks(id_film:any){
    if(this.storage.isLoggedIn()==true){
      var id=this.storage.getUserID();
      this.form.id_user=id.id_user;
      this.form.id_film=id_film;
      this.bookmarkservice.checkBookmark(this.form).subscribe(
        res=>{
          this.bookmarkservice.postBookmarks(this.form).subscribe(
            res=>{
              this.toastr.success("Added Bookmark");
              console.log("Added Bookmark");
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
        });
    }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }

  getBookmarksByUser(){

    this.Films=[];
    
    if(this.storage.isLoggedIn()==true){
      var id_us= this.storage.getUserID();
      this.service.getFilms();
      console.log(this.bookmarkservice.list);
      for(var films of this.bookmarkservice.list){
        console.log(id_us);
        console.log(films);
        if(films.id_user == id_us.id_user){
          for( var film of this.service.list){
            if( films.id_film== film.id_film){
              this.Films.push(film);
              console.log(this.Films);
            }
          }
        }
        
      }
      }
    else{
      this.toastr.error("You Can't bookmark if you are not logged in");
      console.error("You Can't bookmark if you are not logged in");
    }
  }
}


