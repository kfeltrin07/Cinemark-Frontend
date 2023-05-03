import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';
import { RouterLink } from '@angular/router';
import { FilmStranicaComponent } from '../film-stranica/film-stranica.component';

@Component({
  selector: 'app-sort-by-stranica',
  templateUrl: './sort-by-stranica.component.html',
  styleUrls: ['./sort-by-stranica.component.css']
})
export class SortByStranicaComponent implements OnInit {

  selectedFilm:Films;
  constructor(public service:FilmsService) {}

  ngOnInit(): void {
    this.service.getFilms();
  }
 
  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

  openInfo(){
    let filmBox = document.getElementById("filmBox") as HTMLDivElement;
    filmBox.classList.remove("hide-details");
  }
}
