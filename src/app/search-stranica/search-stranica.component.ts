import { Component, OnInit} from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';

@Component({
  selector: 'app-search-stranica',
  templateUrl: './search-stranica.component.html',
  styleUrls: ['./search-stranica.component.css']
})
export class SearchStranicaComponent implements OnInit{

  constructor(public service:FilmsService) {}

  searchedFilms:Films[];

  ngOnInit(): void {

  }

  updateSelectedFilm(film:string){
    this.service.updateFilmByName(film);
  }

}
