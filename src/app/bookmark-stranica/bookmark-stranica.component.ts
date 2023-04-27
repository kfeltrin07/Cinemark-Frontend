import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';

@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})
export class BookmarkStranicaComponent implements OnInit {
  
  selectedFilm:Films;
  constructor(public service:FilmsService) {}

  ngOnInit(): void {
    this.service.getFilms();
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }
}
