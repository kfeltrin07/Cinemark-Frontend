import { Component, OnInit } from '@angular/core';
import { Films } from '../shared/films.model';
import { FilmsService } from '../shared/films.service';

@Component({
  selector: 'app-film-stranica',
  templateUrl: './film-stranica.component.html',
  styleUrls: ['./film-stranica.component.css']
})
export class FilmStranicaComponent implements OnInit {
  
  
  constructor(public service:FilmsService) {
  }

  ngOnInit(): void {
    this.changeToFilm();
  }
  selectedFilm:Films;

  changeToFilm(){
    this.selectedFilm = this.service.getFilmByName();
  }
}
