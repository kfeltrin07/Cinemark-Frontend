import { Component } from '@angular/core';
import { FilmsService } from '../shared/films.service';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent {


  constructor(public service:FilmsService) {}

  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.service.getSearchedFilms(val.value);
  }
}
