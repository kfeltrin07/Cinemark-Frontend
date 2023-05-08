import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { GenreService } from '../shared/genre.service';

@Component({
  selector: 'app-sort-by-stranica',
  templateUrl: './sort-by-stranica.component.html',
  styleUrls: ['./sort-by-stranica.component.css']
})
export class SortByStranicaComponent implements OnInit {

  selectedFilm:Films;
  sortedFilms:Films[];
  constructor(public service:FilmsService, public genreService:GenreService) {}

  ngOnInit(): void {
    this.service.getFilms();
    this.getAllFilms();
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  sortFilmByGenre(id_genre:number){
    this.sortedFilms = [];
    console.log("test");

    for(var item of this.genreService.listFilmGenre){
      if(id_genre == item.id_genre){
        for(var film of this.service.list){
          if(item.id_film == film.id_film){
            this.sortedFilms.push(film);
          }
        }
      }
    }
  }

  getAllFilms(){
    this.sortedFilms = this.service.list;
  }
}
