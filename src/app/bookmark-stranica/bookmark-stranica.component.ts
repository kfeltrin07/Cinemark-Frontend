import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../shared/films.service';
import { Films } from '../shared/films.model';

@Component({
  selector: 'app-bookmark-stranica',
  templateUrl: './bookmark-stranica.component.html',
  styleUrls: ['./bookmark-stranica.component.css']
})
export class BookmarkStranicaComponent implements OnInit {
  
  
  constructor(public service:FilmsService) {}


  ngOnInit(): void {
    this.service.getFilms();
  }
 
}
