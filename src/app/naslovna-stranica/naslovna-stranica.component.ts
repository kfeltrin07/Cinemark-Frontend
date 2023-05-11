import { LoginService } from 'src/app/shared/Login.service';
import { CommentsService } from './../shared/comments.service';
import { GenreService } from './../shared/genre.service';
import { StorageService } from './../_services/storage.service';
import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { LoginStranicaComponent } from '../login-stranica/login-stranica.component';
import { RatingsService } from '../shared/ratings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent {

  LoginPgStatus=false;
  isLoggedIn=false;

  constructor(public filmsService:FilmsService, public bookmarkService:BookmarksService, public loginserv:LoginStranicaComponent, 
    public storageService:StorageService, public genreService:GenreService, public ratingservice:RatingsService, 
    public commentService:CommentsService, public loginService:LoginService, private router: Router) 
    {
      this.filmsService.getFilms();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.bookmarkService.getBookmarks();
      this.storageService.getUser();
      this.storageService.getUserID();
    }
    }


  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.filmsService.getSearchedFilms(val.value);
    this.router.navigate(['search']);
  }
}
