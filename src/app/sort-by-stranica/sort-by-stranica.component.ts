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

  sortFilmByBestRated(){
    this.sortedFilms = [];
    console.log("testBestRated");

    for(var item of this.service.list){
      if((item.total_rating)/(item.rating_count) >= 4.4){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByRatingCount(){
    this.sortedFilms = [];
    console.log("testRatingCount");

    for(var item of this.service.list){
      if(item.rating_count >= 15){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYear2023(){
    this.sortedFilms = [];
    console.log("testYear2023");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) == "2023"){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYear2021_2022(){
    this.sortedFilms = [];
    console.log("testYear21/22");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2021" && item.release_date.substring(0,4) < "2023"){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYear2010_2020(){
    this.sortedFilms = [];
    console.log("testYear10/20");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2010" && item.release_date.substring(0,4) < "2020"){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYear2000_2010(){
    this.sortedFilms = [];
    console.log("testYear00/10");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "2000" && item.release_date.substring(0,4) < "2010"){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYear1990_2000(){
    this.sortedFilms = [];
    console.log("testYear90/00");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) >= "1990" && item.release_date.substring(0,4) < "2000"){
        this.sortedFilms.push(item);
      }
    }
  }

  sortFilmByYearOlder(){
    this.sortedFilms = [];
    console.log("testYearOlder");

    for(var item of this.service.list){
      if(item.release_date.substring(0,4) <= "1990"){
        this.sortedFilms.push(item);
      }
    }
  }

  getAllFilms(){
    this.sortedFilms = this.service.list;
  }
}
