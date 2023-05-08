import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { GenreService } from '../shared/genre.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-sort-by-stranica',
  templateUrl: './sort-by-stranica.component.html',
  styleUrls: ['./sort-by-stranica.component.css']
})
export class SortByStranicaComponent implements OnInit {

  selectedFilm:Films;
  sortedFilms:Films[];
  constructor(public service:FilmsService, public genreService:GenreService, public storageService:StorageService) {}

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
    const filmgenre=this.storageService.getFilmGenres()
    const films= this.storageService.getFilms()
    for(var item of filmgenre){
      if(id_genre == item.id_genre){
        for(var film of films){
          if(item.id_film == film.id_film){
            this.sortedFilms.push(film);
          }
        }
      }
    }
  }

  getAllFilms(){
    const films= this.storageService.getFilms()
    this.sortedFilms = films;
  }
}
