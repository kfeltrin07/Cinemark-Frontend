import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';

@Component({
  selector: 'app-naslovna-stranica',
  templateUrl: './naslovna-stranica.component.html',
  styleUrls: ['./naslovna-stranica.component.css']
})
export class NaslovnaStranicaComponent implements OnInit {

  constructor(public service:FilmsService) {}

  ngOnInit(): void {
    this.service.getFilms();
  }

  onSearchClick(){
    const val = document.getElementById("inputValue") as HTMLInputElement;
    this.service.getSearchedFilms(val.value);
  }
}
