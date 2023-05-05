import { GenreService } from './../shared/genre.service';
import { StorageService } from './../_services/storage.service';
import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { LoginStranicaComponent } from '../login-stranica/login-stranica.component';
import { RatingsService } from '../shared/ratings.service';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent implements OnInit {

  LoginPgStatus=false;
  isLoggedIn=false;

  constructor(public filmsService:FilmsService, public bookmarkService:BookmarksService, public loginserv:LoginStranicaComponent, public storageService:StorageService, public genreService:GenreService, public ratingservice:RatingsService) {}

  ngOnInit(): void {
    this.filmsService.getFilms();
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.bookmarkService.getBookmarks();
    const user = this.storageService.getUser();
    const userID = this.storageService.getUserID();
    }
    this.filmsService.getFilms();
    this.genreService.GetFilmGenre();
    this.genreService.GetGenres();
    this.ratingservice.getRatings();

  }

  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.filmsService.getSearchedFilms(val.value);
  }


}
