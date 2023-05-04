import { BookmarksService } from './../shared/bookmarks.service';
import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { RatingsService } from '../shared/ratings.service';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent implements OnInit {

  constructor(public service:FilmsService, public bookmarkservice:BookmarksService, public ratingservice:RatingsService) {}

  ngOnInit(): void {
    this.service.getFilms();
    this.bookmarkservice.getBookmarks();
    this.ratingservice.getRatings();
  }

  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.service.getSearchedFilms(val.value);
  }


}
