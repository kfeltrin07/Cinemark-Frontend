import { Component, OnInit, ViewChild } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';
import { Film_Genre } from './../shared/film_genre.model';
import { GenreService } from './../shared/genre.service';
import { Genres } from '../shared/genre.model';
import { StorageService } from '../_services/storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-sort-by-stranica',
  templateUrl: './sort-by-stranica.component.html',
  styleUrls: ['./sort-by-stranica.component.css']
})


export class SortByStranicaComponent implements OnInit {

  currentPage = 1; 
  selectedFilm:Films;
  sortedFilms:Films[];
  page: number = 1;
  pageSize: number = 5;
  genres:Genres[];
  genre:string[];
  filmGenre:Film_Genre;

  filteredFilms:any[];

  

  constructor(public service:FilmsService, public genreService:GenreService, public storageService:StorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.service.getFilms();
    this.getAllFilms();


    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = 1; // reset to page 1 when the route changes
      }
    });
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

    var x = document.getElementById("paginator") as unknown as PaginationControlsComponent;
    x.pageChange
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
    const films= this.storageService.getFilms()
    this.sortedFilms = films;
  }

  scrollToTop(event: any){
    window.scrollTo({top:0, behavior: 'smooth'})
  }

  /*onPageChange(event: any){
    if (this.pageSize <= 5){
      this.page = 1;
    }
  }*/

}
